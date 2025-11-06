// import dayjs from "dayjs";

// /**
//  * 时长格式化
//  * @param {number | string} duration 时长ms
//  * @param {boolean} detail 是否显示精确的时长
//  * @returns 格式化后的时长
//  */
// export function durationFormat(
//   duration?: number | string | null,
//   detail?: boolean
// ) {
//   duration = Number(duration);
//   if (!duration || Number.isNaN(duration)) return "";
//   const d = dayjs.duration(duration);
//   if (detail) {
//     let format = "";
//     d.years() && (format += "Y年");
//     d.months() && (format += "M个月");
//     d.days() && (format += "D天");
//     d.hours() && (format += "H小时");
//     d.minutes() && (format += "m分钟");
//     d.seconds() && (format += "s秒");
//     return format ? d.format(format) : "";
//   } else {
//     return d.locale("zh-cn").humanize();
//   }
// }
