import { useEffect, useState } from "react";
import Card from "./Card";
import DoctorsTable from "../doctor/DoctorsTable";
import PatientsTable from "../patients/PatientsTable";
import { MdSecurity } from "react-icons/md";
import { MdMedicalServices } from "react-icons/md";
import { FaUserNurse } from "react-icons/fa";
import { MdPersonalInjury } from "react-icons/md";
import { FaPeopleCarry } from "react-icons/fa";
import { MdApartment } from "react-icons/md";



function DashboardContent() {
  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [patients, setPatients] = useState([]);
  const [wardBoys, setWardBoys] = useState([]);
  const [department, setDepartment] = useState([]);
  const [guard, setGuard] = useState([]);

  const getStatusCounts = (a) => {
    const activeCount = a.filter(item => item.status === "Active").length;
    const inactiveCount = a.filter(item => item.status === "Inactive").length;
    return { activeCount, inactiveCount };
  };

  const doctorStatus = getStatusCounts(doctors);
  const nurseStatus = getStatusCounts(nurses);
  const patientStatus = getStatusCounts(patients);
  const wardBoysStatus = getStatusCounts(wardBoys)
  const DepartmentStatus = getStatusCounts(department)
  const guardStatus = getStatusCounts(guard)

  useEffect(() => {
    setDoctors(JSON.parse(localStorage.getItem("doctors")) || []);
    setNurses(JSON.parse(localStorage.getItem("nurses")) || []);
    setPatients(JSON.parse(localStorage.getItem("patients")) || []);
    setWardBoys(JSON.parse(localStorage.getItem("wardboys")) || []);
    setDepartment(JSON.parse(localStorage.getItem("department")) || []);
    setGuard(JSON.parse(localStorage.getItem("guards")) || []);
  }, []);


  const stats = [
    {
      title: "Doctors",
      icon: <MdMedicalServices />,
      totalCount: doctors.length,
      activeCount: doctorStatus.activeCount,
      inActiveCount: doctorStatus.inactiveCount
    },
    {
      title: "Nurses",
      icon: <FaUserNurse />,
      totalCount: nurses.length,
      activeCount: nurseStatus.activeCount,
      inActiveCount: nurseStatus.inactiveCount
    },
    {
      title: "Patients",
      icon: <MdPersonalInjury />,
      totalCount: patients.length,
      activeCount: patientStatus.activeCount,
      inActiveCount: patientStatus.inactiveCount
    },
    {
      title: "Ward Boys",
      icon: <FaPeopleCarry />,
      totalCount: wardBoys.length,
      activeCount: wardBoysStatus.activeCount,
      inActiveCount: wardBoysStatus.inactiveCount
    },
    {
      title: "Departments",
      icon: <MdApartment />,
      totalCount: department.length,
      activeCount: DepartmentStatus.activeCount,
      inActiveCount: DepartmentStatus.inactiveCount
    },
    {
      title: "Guards",
      icon: <MdSecurity />,
      totalCount: guard.length,
      activeCount: guardStatus.activeCount,
      inActiveCount: guardStatus.inactiveCount
    },
  ]

  return (
    <div className="bg-neutral w-full">
      <h1 className="text-2xl pl-5 font-bold py-2">Dashboard</h1>
      <div className="grid grid-cols-3 gap-5 w-full p-5">
        {stats?.map((item, idx) => (
          <Card
            icon={item.icon}
            title={item.title}
            value={item.totalCount}
            idx={idx}
            activeCount={item.activeCount}
            inActiveCount={item.inActiveCount}
          />
        ))}

      </div>

      <div className="flex gap-5 w-full p-5">
        {doctors.length > 0 && (
          <Card title="Doctors" value={doctors.length} recentCard="true">
            <DoctorsTable
              doctors={doctors.slice(0, 5)}
              showActions={false}
            />
          </Card>
        )}

        <Card title="Patients" value={patients.length} recentCard="true" >
          {patients.length > 0 && (
            <PatientsTable
              patients={patients.slice(0, 5)}
              show={false}
            />
          )
          }
        </Card>
      </div>
    </div>
  );
}

export default DashboardContent;