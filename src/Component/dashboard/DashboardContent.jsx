import { useEffect, useState } from "react";
import Card from "./Card";
import DoctorsTable from "../doctor/DoctorsTable";
import PatientsTable from "../patients/PatientsTable";

function DashboardContent() {
  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [patients, setPatients] = useState([]);

  const getStatusCounts = (a) => {
    const activeCount = a.filter(item => item.status === "Active").length;
    const inactiveCount = a.filter(item => item.status === "Inactive").length;
    return { activeCount, inactiveCount };
  };

  const doctorStatus = getStatusCounts(doctors);
  const nurseStatus = getStatusCounts(nurses);
  const patientStatus = getStatusCounts(patients);

  useEffect(() => {
    setDoctors(JSON.parse(localStorage.getItem("doctors")) || []);
    setNurses(JSON.parse(localStorage.getItem("nurses")) || []);
    setPatients(JSON.parse(localStorage.getItem("patients")) || []);
  }, []);


  const stats = [
    {
      title: "Doctors",
      totalCount: doctors.length,
      activeCount: doctorStatus.activeCount,
      inActiveCount: doctorStatus.inactiveCount
    },
    {
      title: "Nurses",
      totalCount: nurses.length,
      activeCount: nurseStatus.activeCount,
      inActiveCount: nurseStatus.inactiveCount
    },
    {
      title: "Patients",
      totalCount: patients.length,
      activeCount: patientStatus.activeCount,
      inActiveCount: patientStatus.inactiveCount
    }
  ]

  return (
    <div className="bg-neutral w-full">
      <h1 className="text-2xl pl-5 font-bold py-2">Dashboard</h1>
      <div className="grid grid-cols-3 gap-5 w-full p-5">
        {stats?.map((item, idx) => (
          <Card
            title={item.title}
            value={item.totalCount}
            key={idx}
            activeCount={item.activeCount}
            inActiveCount={item.inActiveCount}
          />
        ))}
      
      </div>

      <div className="flex gap-5 w-full p-5">
        <Card title="Doctors" value={doctors.length} recentCard="true">
          {doctors.length > 0 && (
            <DoctorsTable
              doctors={doctors.slice(0, 5)}
              showActions={false}
            />
          )}

        </Card>
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