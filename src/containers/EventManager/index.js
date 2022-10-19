import { useEffect, useState } from "react";

import EventList from "../../components/EventList";
import CreateAndUpdateEvent from "../CreateAndUpdateEvent";

import { v4 as uuidv4 } from "uuid";
import HistoricManager from "../HistoricManager";

const dataSource = [
  {
    id: uuidv4(),
    title: "Ant Design Title 1",
    date: "01/02/2001",
    frequency: "Week",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team",
    historic: [
      "Racing car sprays burning fuel into crowd.",
      "Racing car sprays burning fuel into crowd.",
      "Racing car sprays burning fuel into crowd.",
    ],
  },
  {
    id: uuidv4(),
    title: "Ant Design Title 2",
    date: "01/02/2001",
    frequency: "Week",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team",
    historic: [],
  },
  {
    id: uuidv4(),
    title: "Ant Design Title 3",
    date: "01/02/2001",
    frequency: "Week",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team",
    historic: [],
  },
  {
    id: uuidv4(),
    title: "Ant Design Title 4",
    date: "01/02/2001",
    frequency: "Week",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team",
    historic: [],
  },
];

export default function EventManager() {
  const [event, setEvent] = useState(null);
  const [eventList, setEventList] = useState([]);

  const [historicModal, setHistoricModal] = useState(null);

  useEffect(() => setEventList(dataSource), []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "700px",
        }}
      >
        <CreateAndUpdateEvent
          event={event}
          onCreate={(event) =>
            setEventList((eventList) => [
              { ...event, id: uuidv4() },
              ...eventList,
            ])
          }
          onUpdate={(update) => {
            const newEventList = eventList.map((event) => {
              if (event.id === update.id)
                return {
                  id: update.id,
                  title: update.title ?? event.title,
                  description: update.description ?? event.description,
                  date: update.date ?? event.date,
                  frequency: update.frequency ?? event.frequency,
                  historic: update.historic ?? event.historic,
                };

              return event;
            });
            setEventList(newEventList);
            setEvent(null);
          }}
        />
        <EventList
          dataSource={eventList}
          onUpdate={(e) => setEvent(e)}
          onDelete={(e) => {
            setEventList((eventList) =>
              eventList.filter((event) => event.id !== e.id)
            );
          }}
          onCreateHistoric={(e) => setHistoricModal(e)}
        />
        <HistoricManager
          open={!!historicModal}
          event={historicModal}
          onCreate={(e) => {
            const newEventList = eventList.map((event) => {
              if (event.id === e.eventId)
                return {
                  ...event,
                  historic: [e.historic, ...event.historic],
                };

              return event;
            });

            setEventList(newEventList);
            setHistoricModal(
              newEventList.find((event) => event.id === e.eventId)
            );
          }}
          setOpenModal={(e) => setHistoricModal(e)}
        />
      </div>
    </div>
  );
}
