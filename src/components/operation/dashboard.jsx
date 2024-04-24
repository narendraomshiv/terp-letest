import axios from "axios";
import { useMemo, useState } from "react";
import { API_BASE_URL } from "../../Url/Url";
import { DashboarCard } from "../../dashboardCard";
import { Scheduler } from "@aldabil/react-scheduler";
export const OperationDashboard = () => {
  const [data, setData] = useState({});
  const getData = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/dashboardOpertation`);
      setData(data);
      console.log(data);
    } catch (e) {}
  };
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });
  useState(() => {
    getData();
  }, []);
  //   const required_itf_en = useMemo(() => {
  //     let start = 0;

  //     return (
  //       data?.required_itf_en?.map((v) => {
  //         const dateParts = v["Loading Date"].split("-");
  //         const t = {
  //           event_id: v.ITF,
  //           title: (
  //             <>
  //               {v.itf_name} <b>({v.boxes_required} Required)</b>
  //             </>
  //           ),
  //           start: new Date(
  //             +dateParts[2],
  //             +dateParts[1] - 1,
  //             +dateParts[0],
  //             0,
  //             0
  //           ),
  //           end: new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0], 0, 59),
  //         };
  //         start++;
  //         return t;
  //       }) || []
  //     );
  //   }, [data?.required_itf_en]);
  const required_itf_en = useMemo(() => {
    return (data?.required_itf_en || [])
      .map((v) => {
        if (!v["Loading Date"]) {
          console.warn("Skipping entry due to missing 'Loading Date':", v);
          return null; // Skip this entry
        }
        const dateParts = v["Loading Date"].split("-");
        return {
          event_id: v.ITF,
          title: (
            <>
              {v.itf_name} <b>({v.boxes_required} Required)</b>
            </>
          ),
          start: new Date(
            +dateParts[2],
            +dateParts[1] - 1,
            +dateParts[0],
            0,
            0
          ),
          end: new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0], 0, 59),
        };
      })
      .filter(Boolean); // Remove null entries
  }, [data?.required_itf_en]);

  const Orders_pipline = useMemo(() => {
    return (data?.Orders_pipline || []).map((v) => {
      const loadingDate = new Date(v["Loading Date"]);
      return {
        event_id: v["Shipment_ref"] || "N/A",
        title: (
          <>
            {v["Consignee Name"]} <b>({v["Order Number"] || "No Order #"})</b>
          </>
        ),
        start: new Date(loadingDate.setHours(0, 0, 0, 0)), // Start of the day
        end: new Date(loadingDate.setHours(23, 59, 59, 999)), // End of the day
      };
    });
  }, [data?.Orders_pipline]);
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full dashCard53 flex flex-col gap-5">
          <DashboarCard
            title={"Reuqired EAN New"}
            value={data?.required_ean_new?.length || 0}
            icon={"package-variant-closed"}
            content={
              <div className="text-sm flex-col divide-y">
                {data?.required_ean_new?.map((v) => (
                  <div className=" py-2 px-2">
                    {v.EAN_name_en}{" "}
                    <b>({(+v.ean_needed).toLocaleString()} Needed)</b>
                  </div>
                ))}
              </div>
            }
          />
          <DashboarCard
            title={"Reuqired EAN"}
            value={data?.required_ean_en?.length || 0}
            icon={"package-variant-closed"}
            content={
              <div className="text-sm flex-col divide-y">
                {data?.required_ean_en?.map((v) => (
                  <div className=" py-2 px-2">
                    {v.EAN_name_en}{" "}
                    <b>({(+v.ean_needed).toLocaleString()} Needed)</b>
                  </div>
                ))}
              </div>
            }
          />
        </div>
        <div className="w-full">
          <div className="bg-white rounded w-full flex-col flex divide-y mb-5">
            <div className="font-bold text-lg py-3 px-3">Required ITF Ean</div>
            {/* {dates.map((date, index) => (
              <div key={`cald_${index}`} className="px-2 py-2">
                {date.getDate()}{" "}
                {date.toLocaleDateString("default", { month: "short" })}{" "}
                {date?.getFullYear()}
                {required_itf_en
                  .filter((v) => v.start?.getFullYear() === date?.getFullYear())
                  .filter((v) => v.start.getMonth() === date.getMonth())
                  .filter((v) => v.start.getDate() === date.getDate())
                  .length ? (
                  required_itf_en
                    .filter(
                      (v) => v.start?.getFullYear() === date?.getFullYear()
                    )
                    .filter((v) => v.start.getMonth() === date.getMonth())
                    .filter((v) => v.start.getDate() === date.getDate())
                    .map((v) => <div>{v.title}</div>)
                ) : (
                  <div className="text-gray-400 italic">Nothing</div>
                )}
              </div>
            ))} */}
            <Scheduler
              view="week"
              events={required_itf_en}
              editable={false}
              deletable={false}
              draggable={false}
              week={{
                startHour: 0,
                endHour: 24,
                step: 60,
              }}
              day={null}
              eventRenderer={({ event, ...props }) => (
                <div
                  className="py-1 bg-blue-500 text-white px-2 h-full flex items-center text-center text-xs"
                  {...props}
                >
                  {event.title}
                </div>
              )}
            />
          </div>

          <div className="bg-white rounded w-full flex-col flex divide-y">
            <div className="font-bold text-lg py-3 px-3">Order pipeline</div>
            {/* {dates.map((date, index) => (
              <div key={`cald_${index}`} className="px-2 py-2">
                {date.getDa} {date.getDate()}{" "}
                {date.toLocaleDateString("default", { month: "short" })}{" "}
                {date?.getFullYear()}
                <div className="flex flex-col gap-2">
                  {Orders_pipline.filter(
                    (v) =>
                      v["Loading Date"]?.getFullYear() === date?.getFullYear()
                  )
                    .filter(
                      (v) => v["Loading Date"].getMonth() === date.getMonth()
                    )
                    .filter(
                      (v) => v["Loading Date"].getDate() === date.getDate()
                    ).length ? (
                    Orders_pipline.filter(
                      (v) => v.start?.getFullYear() === date?.getFullYear()
                    )
                      .filter((v) => v.start.getMonth() === date.getMonth())
                      .filter((v) => v.start.getDate() === date.getDate())
                      .map((v) => (
                        <div className="bg-gray-900 text-white p-2 rounded">
                          <div className="flex gap-2 justify-between">
                            <b>{v["Consignee Name"]}</b>
                            <div>
                              {v["Loading Time"]}{" "}
                              <i className="mdi mdi-clock-outline" />
                            </div>
                          </div>
                          <i className="mdi mdi-barcode" /> {v["Order Number"]}
                          <br />
                          <b>AWB/BL</b> {v["AWB/BL"]}
                          <br />
                          <i className="mdi mdi-airplane" /> {v.port_name}
                        </div>
                      ))
                  ) : (
                    <div className="text-gray-400 italic">Nothing</div>
                  )}
                </div>
              </div>
            ))} */}
			 <Scheduler
            view="week"
            events={Orders_pipline}
            editable={false}
            deletable={false}
            draggable={false}
            week={{
              startHour: 0,
              endHour: 24,
              step: 60,
            }}
            day={null}
            eventRenderer={({ event, ...props }) => (
              <div
                className="py-1 bg-green-500 text-white px-2 h-full flex items-center text-center text-xs"
                {...props}
              >
                {event.title}
              </div>
            )}
          />
          </div>
        </div>
      </div>
    </>
  );
};
