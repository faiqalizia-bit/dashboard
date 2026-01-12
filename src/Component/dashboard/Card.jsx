function Card({ title, value, children, recentCard = "false", key, activeCount, inActiveCount }) {

  return (
    <div className="w-full bg-white p-5 rounded shadow" key={key}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">{title}</h3>
        {recentCard !== "true" &&
          <p className="flex justify-center items-center text-lg font-medium bg-primary p-2 size-[35px] rounded-full text-white ">{value}</p>
        }
      </div>
      {recentCard !== "true" &&
        <div className="flex gap-[10px] items-center">
          <p className="text-[12px]"><span className="inline-block rounded-full bg-green-500 size-[10px] mr-1"></span>Active: <span className="font-bold" >{activeCount}</span> </p>
          <p className="text-[12px]"><span className="inline-block rounded-full bg-red-500 size-[10px] mr-1"></span>Inactive:  <span className="font-bold" >{inActiveCount} </span> </p>
        </div>
      }
      {children}
    </div>
  );
}

export default Card;