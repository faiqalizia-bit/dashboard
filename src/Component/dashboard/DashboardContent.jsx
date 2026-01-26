import { useEffect, useState } from "react";
import Card from "./Card";
import PatientsTable from "../patients/PatientsTable";
import { MdSecurity } from "react-icons/md";
import { MdMedicalServices } from "react-icons/md";
import { FaUserNurse } from "react-icons/fa";
import { MdPersonalInjury } from "react-icons/md";
import { FaPeopleCarry } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import API from "../../api";
import DoctorsTable from "../doctor/List";

function DashboardContent() {
  const [stats, setStats] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await API.get("/doctors");
      setDoctors(res.data.doctors);
    };

    const fetchPatients = async () => {
      const res = await API.get("/patients");
      setPatients(res.data.patients);
    };

    fetchDoctors();
    fetchPatients();
  }, []);

  const cards = stats
    ? [
        {
          title: "Doctors",
          icon: <MdMedicalServices />,
          totalCount: stats.doctors.total,
          activeCount: stats.doctors.active,
          inActiveCount: stats.doctors.inactive,
        },
        {
          title: "Nurses",
          icon: <FaUserNurse />,
          totalCount: stats.nurses.total,
          activeCount: stats.nurses.active,
          inActiveCount: stats.nurses.inactive,
        },
        {
          title: "Patients",
          icon: <MdPersonalInjury />,
          totalCount: stats.patients.total,
          activeCount: stats.patients.active,
          inActiveCount: stats.patients.inactive,
        },
        {
          title: "Ward Boys",
          icon: <FaPeopleCarry />,
          totalCount: stats.wardBoys.total,
          activeCount: stats.wardBoys.active,
          inActiveCount: stats.wardBoys.inactive,
        },
        {
          title: "Departments",
          icon: <MdApartment />,
          totalCount: stats.departments.total,
          activeCount: stats.departments.active,
          inActiveCount: stats.departments.inactive,
        },
        {
          title: "Guards",
          icon: <MdSecurity />,
          totalCount: stats.guards.total,
          activeCount: stats.guards.active,
          inActiveCount: stats.guards.inactive,
        },
      ]
    : [];

  return (
    <div className="bg-neutral w-full">
      <h1 className="text-2xl pl-5 font-bold py-2">Dashboard</h1>
      <div className="grid grid-cols-3 gap-5 w-full p-5">
        {cards.map((item, idx) => (
          <Card
            icon={item.icon}
            title={item.title}
            value={item.totalCount}
            key={idx}
            activeCount={item.activeCount}
            inActiveCount={item.inActiveCount}
          />
        ))}
      </div>

      <div className="flex gap-5 w-full p-5">
        {doctors.length > 0 && (
          <Card title="Doctors" value={doctors.length} recentCard="true">
            <DoctorsTable doctors={doctors.slice(0, 5)} showActions={false} />
          </Card>
        )}

        <Card title="Patients" value={patients.length} recentCard="true">
          {patients.length > 0 && (
            <PatientsTable patients={patients.slice(0, 5)} show={false} />
          )}
        </Card>
      </div>
    </div>
  );
}

export default DashboardContent;
