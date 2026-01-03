import consultantFirst from "../../assets/consultants/consultant1.jpg";
import consultantSecond from "../../assets/consultants/consultant2.jpg";

export type Consultant = {
  id: string;
  name: string;
  role: string;
  photo: string;
};

export const CONSULTANTS: Consultant[] = [
  {
    id: "michael-carter",
    name: "Michael Carter",
    role: "Vehicle Sourcing Specialist",
    photo: consultantFirst,
  },
  {
    id: "emily-johnson",
    name: "Emily Johnson",
    role: "Logistics & Delivery Consultant",
    photo: consultantSecond,
  },
];
