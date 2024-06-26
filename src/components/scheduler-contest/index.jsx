import React from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  Month,
  Inject,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import { loadCldr, L10n } from "@syncfusion/ej2-base";
import * as gregorian from "cldr-data/main/vi/ca-gregorian.json";
import * as numbers from "cldr-data/main/vi/numbers.json";
import * as timeZoneNames from "cldr-data/main/vi/timeZoneNames.json";
import * as numberingSystems from "cldr-data/supplemental/numberingSystems.json";

loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);

L10n.load({
  vi: {
    schedule: {
      day: "Ngày",
      week: "Tuần",
      workWeek: "Tuần làm việc",
      month: "Tháng",
      agenda: "Lịch trình",
      today: "Hôm nay",
      noEvents: "Không có sự kiện nào",
      allDay: "Cả ngày",
      start: "Bắt đầu",
      end: "Kết thúc",
      more: "Thêm",
    },
  },
});

const ScheduleContest = ({ contests }) => {
  // Kiểm tra contests có phải là mảng hay không
  const scheduleData = Array.isArray(contests)
    ? contests.map((contest) => ({
        Id: contest.id,
        Subject: contest.name,
        StartTime: new Date(`${contest.date}T${contest.startime}`),
        EndTime: new Date(`${contest.date}T${contest.endtime}`),
        Location: contest.location,
        Description: contest.description,
      }))
    : [];

  const onEventRendered = (args) => {
    let event = args.data;
    let currentDate = new Date();
    let eventDate = new Date(event.StartTime);

    if (format(eventDate, "yyyy-MM-dd") === format(currentDate, "yyyy-MM-dd")) {
      args.element.style.backgroundColor = "yellow";
    }
  };

  return (
    <Box p={3} ml={3}>
      <Typography variant="h4" mb={3}>
        Lịch thi đấu
      </Typography>
      <ScheduleComponent
        height="650px"
        locale="vi"
        eventSettings={{ dataSource: scheduleData }}
        readonly={true}
        eventRendered={onEventRendered}
      >
        <ViewsDirective>
          <ViewDirective option="Day" displayName="Ngày" />
          <ViewDirective option="Week" displayName="Tuần" />
          <ViewDirective option="Month" displayName="Tháng" />
        </ViewsDirective>
        <Inject services={[Day, Week, Month]} />
      </ScheduleComponent>
    </Box>
  );
};

export default ScheduleContest;
