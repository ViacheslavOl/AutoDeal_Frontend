import { useEffect, useMemo, useState } from "react";
import styles from "./AdminPanel.module.scss";
import { isAdmin, isAuthenticated, subscribeAuthChange } from "../../utils/auth";
import { getLeads, type Lead } from "../api/leads.api";
import { createCar } from "../api/cars.api";
import { updateConsultant, type ConsultantPosition } from "../api/consultants.api";

const TABS = {
  LEADS: "leads",
  ADD_CAR: "addCar",
  CONSULTANTS: "consultants",
} as const;

type TabKey = (typeof TABS)[keyof typeof TABS];

const AdminPanel = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>(TABS.LEADS);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [authState, setAuthState] = useState(() => ({
    authed: isAuthenticated(),
    admin: isAdmin(),
  }));
  const [consultantForm, setConsultantForm] = useState<{
    position: ConsultantPosition;
    name: string;
    title: string;
    photo: File | null;
  }>({
    position: "right",
    name: "",
    title: "",
    photo: null,
  });
  const [consultantSubmitting, setConsultantSubmitting] = useState(false);
  const [consultantSuccess, setConsultantSuccess] = useState<string | null>(null);
  const [consultantError, setConsultantError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeAuthChange(() =>
      setAuthState({
        authed: isAuthenticated(),
        admin: isAdmin(),
      })
    );

    return unsubscribe;
  }, []);

  const [formState, setFormState] = useState({
    name: "",
    price: "",
    seats: "",
    body: "",
    fuel: "",
    lot: "",
    mileage: "",
    auction: "",
    year: "",
    color: "",
    engine: "",
    drive: "",
    transmission: "",
    state: "",
    owners: "",
    equipment: "",
    vin: "",
    description: "",
    status: "IN STOCK",
    country: "",
    city: "",
  });

  const hasAccess = useMemo(() => authState.authed && authState.admin, [authState.authed, authState.admin]);

  useEffect(() => {
    if (!hasAccess) {
      setLeads([]);
      return;
    }

    let cancelled = false;

    const loadLeads = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getLeads();
        if (!cancelled) setLeads(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadLeads();

    return () => {
      cancelled = true;
    };
  }, [hasAccess]);

  const renderCar = (l: Lead) => {
    return l.carTitle ?? ([l.carMake, l.carBody, l.carBudget].filter(Boolean).join(" / ") || "-");
  };

  const resetForm = () => {
    setFormState({
      name: "",
      price: "",
      seats: "",
      body: "",
      fuel: "",
      lot: "",
      mileage: "",
      auction: "",
      year: "",
      color: "",
      engine: "",
      drive: "",
      transmission: "",
      state: "",
      owners: "",
      equipment: "",
      vin: "",
      description: "",
      status: "IN STOCK",
      country: "",
      city: "",
    });
    setPhotoFiles([]);
  };

  const handlePhotosChange = (files: FileList | null) => {
    if (!files) return;

    const selected = Array.from(files).slice(0, 5);
    setFormError(null);
    setFormSuccess(null);

    setPhotoFiles(selected);
  };

  const validateForm = () => {
    if (photoFiles.length === 0) return "Add at least one photo";
    if (!formState.name.trim()) return "Enter the name of the vehicle";
    if (!formState.price.trim()) return "Enter the price";
    if (formState.price && !/^\d+(\.\d+)?$/.test(formState.price.trim())) return "The price must be a number.";
    if (formState.vin && formState.vin.trim().length < 10) return "VIN must contain at least 10 characters";
    return null;
  };

  const validateConsultantForm = () => {
    const name = consultantForm.name.trim();
    const title = consultantForm.title.trim();

    if (!name && !title && !consultantForm.photo) return "Fill at least one field to update";
    if (name && name.length < 2) return "Name must be at least 2 characters long";
    if (name && name.length > 80) return "Name is too long (max 80 characters)";
    if (title && title.length < 2) return "Title must be at least 2 characters long";
    if (title && title.length > 120) return "Title is too long (max 120 characters)";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    const equipmentList = formState.equipment
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    try {
      setSubmitting(true);
      await createCar({
        photos: photoFiles,
        name: formState.name,
        price: formState.price,
        seats: formState.seats,
        body: formState.body,
        fuel: formState.fuel,
        lot: formState.lot,
        mileage: formState.mileage,
        auction: formState.auction,
        year: formState.year,
        color: formState.color,
        engine: formState.engine,
        drive: formState.drive,
        transmission: formState.transmission,
        state: formState.state,
        owners: formState.owners,
        equipment: equipmentList,
        vin: formState.vin,
        description: formState.description,
        status: formState.status,
        country: formState.country,
        city: formState.city,
      });

      setFormSuccess("The car was created and sent to the backend.");
      resetForm();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "Failed to send data");
    } finally {
      setSubmitting(false);
    }
  };

  const handleConsultantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setConsultantError(null);
    setConsultantSuccess(null);

    const validationError = validateConsultantForm();
    if (validationError) {
      setConsultantError(validationError);
      return;
    }

    try {
      setConsultantSubmitting(true);
      await updateConsultant(consultantForm.position, {
        name: consultantForm.name.trim() || undefined,
        title: consultantForm.title.trim() || undefined,
        photo: consultantForm.photo,
      });

      setConsultantSuccess("Consultant updated successfully.");
      setConsultantForm((prev) => ({ ...prev, name: "", title: "", photo: null }));
    } catch (e) {
      setConsultantError(e instanceof Error ? e.message : "Failed to update consultant");
    } finally {
      setConsultantSubmitting(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Admin Panel</h1>
        </div>

        {!hasAccess ? (
          <div className={styles.withoutAccess}>You do not have permission to view this page.</div>
        ) : (
          <>
            <div className={styles.tabs} role="tablist" aria-label="Admin panel tabs">
              <button type="button" role="tab" aria-selected={activeTab === TABS.LEADS} className={`${styles.tabButton} ${activeTab === TABS.LEADS ? styles.tabButtonActive : ""}`} onClick={() => setActiveTab(TABS.LEADS)}>
                Leads
              </button>
              <button type="button" role="tab" aria-selected={activeTab === TABS.ADD_CAR} className={`${styles.tabButton} ${activeTab === TABS.ADD_CAR ? styles.tabButtonActive : ""}`} onClick={() => setActiveTab(TABS.ADD_CAR)}>
                Add a vehicle
              </button>
              <button type="button" role="tab" aria-selected={activeTab === TABS.CONSULTANTS} className={`${styles.tabButton} ${activeTab === TABS.CONSULTANTS ? styles.tabButtonActive : ""}`} onClick={() => setActiveTab(TABS.CONSULTANTS)}>
                Consultants
              </button>
            </div>

            {loading && <div className={styles.info}>Loading…</div>}
            {error && <div className={styles.error}>{error}</div>}

            {activeTab === TABS.LEADS && (
              <>
                <div className={styles.stats}>
                  Total leads: <b>{leads.length}</b>
                </div>

                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Email</th>
                        <th>Consultant</th>
                        <th>Preferred time</th>
                        <th>Car</th>
                        <th>Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((l) => (
                        <tr key={l.id}>
                          <td className={styles.type}>{l.type}</td>
                          <td>{l.email}</td>
                          <td>{l.consultant ?? "-"}</td>
                          <td>{l.preferredTime ?? "-"}</td>
                          <td>{renderCar(l)}</td>
                          <td>{new Date(l.createdAt).toLocaleString("de-DE")}</td>
                        </tr>
                      ))}

                      {!loading && leads.length === 0 && (
                        <tr>
                          <td className={styles.empty} colSpan={7}>
                            No leads yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeTab === TABS.ADD_CAR && (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <p className={styles.formHint}>Fill in the vehicle details. Photos are uploaded from your computer.</p>

                {formError && <div className={styles.error}>{formError}</div>}
                {formSuccess && <div className={styles.success}>{formSuccess}</div>}

                <label className={styles.formField}>
                  <span>Photos (up to 5)</span>
                  <input type="file" accept="image/*" multiple onChange={(e) => handlePhotosChange(e.target.files)} />
                  {photoFiles.length > 0 && <small className={styles.formHelp}>Files selected: {photoFiles.length}</small>}
                </label>

                <label className={styles.formField}>
                  <span>Vehicle name</span>
                  <input type="text" placeholder="For example, Porsche 911 (992) Carrera GTS" value={formState.name} onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))} />
                </label>

                <label className={styles.formField}>
                  <span>Price</span>
                  <input type="text" placeholder="For example, 139900" value={formState.price} onChange={(e) => setFormState((s) => ({ ...s, price: e.target.value }))} />
                </label>

                <label className={styles.formField}>
                  <span>Status</span>
                  <select value={formState.status} onChange={(e) => setFormState((s) => ({ ...s, status: e.target.value }))}>
                    <option value="IN STOCK">IN STOCK</option>
                    <option value="SOLD">SOLD</option>
                    <option value="RESERVED">RESERVED</option>
                  </select>
                </label>

                <label className={styles.formField}>
                  <span>Lot</span>
                  <input type="text" placeholder="For example, EU-SPORT-992-01421" value={formState.lot} onChange={(e) => setFormState((s) => ({ ...s, lot: e.target.value }))} />
                </label>

                <label className={styles.formField}>
                  <span>VIN</span>
                  <input type="text" placeholder="For example, WP0AB2A920N21S2Q3456" value={formState.vin} onChange={(e) => setFormState((s) => ({ ...s, vin: e.target.value }))} />
                </label>

                <label className={styles.formField}>
                  <span>Year</span>
                  <input type="text" placeholder="For example, 2022" value={formState.year} onChange={(e) => setFormState((s) => ({ ...s, year: e.target.value }))} />
                </label>

                <label className={styles.formField}>
                  <span>Mileage (km)</span>
                  <input type="text" placeholder="For example, 18500" value={formState.mileage} onChange={(e) => setFormState((s) => ({ ...s, mileage: e.target.value }))} />
                </label>

                <label className={styles.formField}>
                  <span>Body type</span>
                  <input type="text" placeholder="For example, Coupe" value={formState.body} onChange={(e) => setFormState((s) => ({ ...s, body: e.target.value }))} />
                </label>

                <label className={styles.formField}>
                  <span>Seats</span>
                  <input type="text" placeholder="For example, 4" value={formState.seats} onChange={(e) => setFormState((s) => ({ ...s, seats: e.target.value }))} />
                </label>

                <label className={styles.formField}>
                  <span>Fuel</span>
                  <input type="text" placeholder="For example, Petrol" value={formState.fuel} onChange={(e) => setFormState((s) => ({ ...s, fuel: e.target.value }))} />
                </label>

                <label className={styles.formField}>
                  <span>Engine</span>
                  <input type="text" placeholder="For example, 3.0T" value={formState.engine} onChange={(e) => setFormState((s) => ({ ...s, engine: e.target.value }))} />
                </label>

                <label className={styles.formField}>
                  <span>Drivetrain</span>
                  <input type="text" placeholder="For example, RWD" value={formState.drive} onChange={(e) => setFormState((s) => ({ ...s, drive: e.target.value }))} />
                </label>

                <label className={styles.formField}>
                  <span>Transmission</span>
                  <input type="text" placeholder="For example, Automatic" value={formState.transmission} onChange={(e) => setFormState((s) => ({ ...s, transmission: e.target.value }))} />
                </label>

                <label className={styles.formField}>
                  <span>Color</span>
                  <input type="text" placeholder="For example, Grey" value={formState.color} onChange={(e) => setFormState((s) => ({ ...s, color: e.target.value }))} />
                </label>

                <label className={styles.formField}>
                  <span>Country</span>
                  <input type="text" placeholder="For example, Germany" value={formState.country} onChange={(e) => setFormState((s) => ({ ...s, country: e.target.value }))} />
                </label>

                <label className={styles.formField}>
                  <span>State / Region</span>
                  <input type="text" placeholder="For example, Bavaria" value={formState.state} onChange={(e) => setFormState((s) => ({ ...s, state: e.target.value }))} />
                </label>

                <label className={styles.formField}>
                  <span>City</span>
                  <input type="text" placeholder="For example, Munich" value={formState.city} onChange={(e) => setFormState((s) => ({ ...s, city: e.target.value }))} />
                </label>

                <label className={styles.formField}>
                  <span>Owners</span>
                  <input type="text" placeholder="For example, 1" value={formState.owners} onChange={(e) => setFormState((s) => ({ ...s, owners: e.target.value }))} />
                </label>

                <label className={styles.formField}>
                  <span>Auction / Source</span>
                  <input type="text" placeholder="For example, Dealer stock" value={formState.auction} onChange={(e) => setFormState((s) => ({ ...s, auction: e.target.value }))} />
                </label>

                <label className={styles.formField}>
                  <span>Equipment</span>
                  <textarea rows={3} placeholder="For example, ABS, ESP, Sport Chrono, Heated Seats..." value={formState.equipment} onChange={(e) => setFormState((s) => ({ ...s, equipment: e.target.value }))} />
                  <small className={styles.formHelp}>List items separated by commas.</small>
                </label>

                <label className={styles.formField}>
                  <span>Description</span>
                  <textarea rows={4} placeholder="Short description..." value={formState.description} onChange={(e) => setFormState((s) => ({ ...s, description: e.target.value }))} />
                </label>
                <button className={styles.buttonAdd} type="submit" disabled={submitting}>
                  {submitting ? "Submitting..." : "Add"}
                </button>
              </form>
            )}

            {activeTab === TABS.CONSULTANTS && (
              <form className={`${styles.form} ${styles.consultantTab}`} onSubmit={handleConsultantSubmit}>
                <p className={styles.formHint}>Update consultant details. Leave empty fields to keep current values.</p>
                {consultantError && <div className={styles.error}>{consultantError}</div>}
                {consultantSuccess && <div className={styles.success}>{consultantSuccess}</div>}

                <label className={styles.formField}>
                  <span>Select consultant</span>
                  <select
                    value={consultantForm.position}
                    onChange={(e) =>
                      setConsultantForm((s) => ({
                        ...s,
                        position: e.target.value as ConsultantPosition,
                      }))
                    }
                  >
                    <option value="right">Right consultant</option>
                    <option value="left">Left consultant</option>
                  </select>
                </label>

                <label className={styles.formField}>
                  <span>Name</span>
                  <input type="text" placeholder="Enter name" value={consultantForm.name} onChange={(e) => setConsultantForm((s) => ({ ...s, name: e.target.value }))} />
                  <small className={styles.formHelp}>2-80 characters.</small>
                </label>

                <label className={styles.formField}>
                  <span>Title</span>
                  <input type="text" placeholder="Enter title" value={consultantForm.title} onChange={(e) => setConsultantForm((s) => ({ ...s, title: e.target.value }))} />
                  <small className={styles.formHelp}>2-120 characters.</small>
                </label>

                <label className={styles.formField}>
                  <span>Photo</span>
                  <input type="file" accept="image/*" onChange={(e) => setConsultantForm((s) => ({ ...s, photo: e.target.files?.[0] ?? null }))} />
                  <small className={styles.formHelp}>Optional. Replaces existing photo.</small>
                </label>

                <button className={styles.buttonAdd} type="submit" disabled={consultantSubmitting}>
                  {consultantSubmitting ? "Updating..." : "Update"}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AdminPanel;
