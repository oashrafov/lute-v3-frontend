import { AreaChart } from "@mantine/charts";

const rawData = [
  {
    spanish: 870,
    german: 578,
    greek: 952,
    russian: 727,
    italian: 47,
    date: "2023-11-23T04:46:27Z",
  },
  {
    spanish: 598,
    german: 352,
    greek: 284,
    russian: 139,
    italian: 66,
    date: "2023-12-23T07:00:26Z",
  },
  {
    spanish: 782,
    german: 825,
    greek: 605,
    russian: 250,
    italian: 146,
    date: "2024-08-23T02:15:38Z",
  },
  {
    spanish: 520,
    german: 257,
    greek: 777,
    russian: 809,
    italian: 353,
    date: "2024-09-09T11:12:34Z",
  },
  {
    spanish: 243,
    german: 202,
    greek: 11,
    russian: 91,
    italian: 304,
    date: "2024-07-03T23:28:33Z",
  },
  {
    spanish: 774,
    german: 897,
    greek: 748,
    russian: 754,
    italian: 380,
    date: "2024-06-02T01:24:07Z",
  },
  {
    spanish: 298,
    german: 400,
    greek: 540,
    russian: 571,
    italian: 263,
    date: "2024-02-19T19:45:18Z",
  },
  {
    spanish: 365,
    german: 210,
    greek: 699,
    russian: 638,
    italian: 219,
    date: "2023-12-24T20:34:36Z",
  },
  {
    spanish: 256,
    german: 537,
    greek: 376,
    russian: 778,
    italian: 232,
    date: "2024-11-13T10:22:58Z",
  },
  {
    spanish: 815,
    german: 452,
    greek: 332,
    russian: 45,
    italian: 611,
    date: "2024-06-13T12:59:58Z",
  },
  {
    spanish: 763,
    german: 278,
    greek: 29,
    russian: 49,
    italian: 667,
    date: "2024-11-14T08:22:07Z",
  },
  {
    spanish: 903,
    german: 670,
    greek: 380,
    russian: 653,
    italian: 50,
    date: "2024-06-10T06:37:44Z",
  },
  {
    spanish: 63,
    german: 930,
    greek: 986,
    russian: 974,
    italian: 213,
    date: "2024-04-28T20:39:47Z",
  },
  {
    spanish: 196,
    german: 779,
    greek: 694,
    russian: 408,
    italian: 803,
    date: "2024-01-02T14:04:49Z",
  },
  {
    spanish: 269,
    german: 844,
    greek: 594,
    russian: 36,
    italian: 150,
    date: "2024-09-01T16:27:25Z",
  },
  {
    spanish: 592,
    german: 333,
    greek: 72,
    russian: 358,
    italian: 789,
    date: "2024-03-05T02:19:12Z",
  },
  {
    spanish: 339,
    german: 929,
    greek: 975,
    russian: 90,
    italian: 765,
    date: "2023-12-26T18:27:49Z",
  },
  {
    spanish: 506,
    german: 808,
    greek: 174,
    russian: 966,
    italian: 172,
    date: "2024-02-19T15:56:33Z",
  },
  {
    spanish: 700,
    german: 431,
    greek: 163,
    russian: 549,
    italian: 367,
    date: "2024-05-15T20:10:58Z",
  },
  {
    spanish: 822,
    german: 86,
    greek: 435,
    russian: 356,
    italian: 372,
    date: "2024-08-04T00:07:38Z",
  },
  {
    spanish: 59,
    german: 451,
    greek: 677,
    russian: 650,
    italian: 147,
    date: "2024-09-20T10:50:44Z",
  },
  {
    spanish: 107,
    german: 459,
    greek: 735,
    russian: 249,
    italian: 97,
    date: "2024-09-03T22:12:36Z",
  },
  {
    spanish: 529,
    german: 131,
    greek: 226,
    russian: 571,
    italian: 699,
    date: "2024-04-02T04:24:35Z",
  },
  {
    spanish: 329,
    german: 949,
    greek: 165,
    russian: 183,
    italian: 446,
    date: "2024-03-18T23:07:15Z",
  },
  {
    spanish: 643,
    german: 94,
    greek: 997,
    russian: 925,
    italian: 133,
    date: "2024-01-07T00:38:10Z",
  },
  {
    spanish: 981,
    german: 238,
    greek: 924,
    russian: 319,
    italian: 120,
    date: "2024-07-15T11:53:23Z",
  },
  {
    spanish: 657,
    german: 557,
    greek: 80,
    russian: 42,
    italian: 126,
    date: "2024-05-14T14:21:21Z",
  },
  {
    spanish: 378,
    german: 456,
    greek: 519,
    russian: 126,
    italian: 232,
    date: "2024-06-28T06:28:51Z",
  },
  {
    spanish: 212,
    german: 512,
    greek: 828,
    russian: 85,
    italian: 75,
    date: "2024-06-18T18:31:24Z",
  },
  {
    spanish: 549,
    german: 134,
    greek: 314,
    russian: 379,
    italian: 931,
    date: "2024-07-02T14:36:56Z",
  },
  {
    spanish: 506,
    german: 946,
    greek: 440,
    russian: 381,
    italian: 447,
    date: "2023-12-18T08:27:21Z",
  },
  {
    spanish: 221,
    german: 105,
    greek: 757,
    russian: 896,
    italian: 270,
    date: "2024-06-13T19:22:11Z",
  },
  {
    spanish: 504,
    german: 669,
    greek: 138,
    russian: 789,
    italian: 312,
    date: "2024-05-26T13:31:16Z",
  },
  {
    spanish: 972,
    german: 66,
    greek: 898,
    russian: 679,
    italian: 749,
    date: "2024-08-01T00:45:32Z",
  },
  {
    spanish: 153,
    german: 52,
    greek: 880,
    russian: 736,
    italian: 854,
    date: "2023-12-18T10:21:51Z",
  },
  {
    spanish: 740,
    german: 62,
    greek: 804,
    russian: 515,
    italian: 554,
    date: "2023-12-06T19:44:51Z",
  },
  {
    spanish: 614,
    german: 95,
    greek: 485,
    russian: 794,
    italian: 297,
    date: "2024-01-19T21:28:34Z",
  },
  {
    spanish: 853,
    german: 293,
    greek: 923,
    russian: 378,
    italian: 892,
    date: "2024-05-14T13:30:02Z",
  },
  {
    spanish: 657,
    german: 417,
    greek: 271,
    russian: 285,
    italian: 839,
    date: "2024-07-13T19:24:09Z",
  },
  {
    spanish: 985,
    german: 533,
    greek: 693,
    russian: 228,
    italian: 992,
    date: "2023-12-03T23:21:55Z",
  },
  {
    spanish: 996,
    german: 184,
    greek: 111,
    russian: 484,
    italian: 154,
    date: "2024-10-21T21:49:38Z",
  },
  {
    spanish: 480,
    german: 49,
    greek: 649,
    russian: 511,
    italian: 734,
    date: "2023-12-31T16:04:17Z",
  },
  {
    spanish: 489,
    german: 849,
    greek: 270,
    russian: 639,
    italian: 615,
    date: "2024-05-16T22:20:07Z",
  },
  {
    spanish: 88,
    german: 810,
    greek: 53,
    russian: 323,
    italian: 674,
    date: "2024-07-18T23:55:19Z",
  },
  {
    spanish: 358,
    german: 410,
    greek: 992,
    russian: 307,
    italian: 233,
    date: "2024-06-23T13:41:39Z",
  },
  {
    spanish: 401,
    german: 698,
    greek: 566,
    russian: 644,
    italian: 810,
    date: "2024-09-18T21:22:00Z",
  },
  {
    spanish: 190,
    german: 469,
    greek: 57,
    russian: 749,
    italian: 372,
    date: "2024-11-11T07:29:20Z",
  },
  {
    spanish: 550,
    german: 301,
    greek: 408,
    russian: 228,
    italian: 253,
    date: "2024-04-21T20:14:51Z",
  },
  {
    spanish: 365,
    german: 659,
    greek: 220,
    russian: 670,
    italian: 688,
    date: "2024-10-23T09:57:28Z",
  },
  {
    spanish: 620,
    german: 556,
    greek: 533,
    russian: 422,
    italian: 836,
    date: "2024-10-24T16:10:47Z",
  },
];

const data = rawData
  .toSorted(function (a, b) {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  })
  .map((d) => {
    const date = new Date(new Date(d.date).getTime());
    const locale = date.toLocaleDateString("az-Az");
    return { ...d, date: locale };
  });

// const data = {
//   German: [
//     {
//       readdate: "2023-12-25",
//       runningTotal: 0,
//       wordcount: 0,
//     },
//     {
//       readdate: "2023-12-26",
//       runningTotal: 71,
//       wordcount: 71,
//     },
//     {
//       readdate: "2023-12-27",
//       runningTotal: 746,
//       wordcount: 675,
//     },
//     {
//       readdate: "2023-12-28",
//       runningTotal: 1149,
//       wordcount: 403,
//     },
//     {
//       readdate: "2023-12-29",
//       runningTotal: 2027,
//       wordcount: 878,
//     },
//     {
//       readdate: "2023-12-30",
//       runningTotal: 2522,
//       wordcount: 495,
//     },
//     {
//       readdate: "2024-01-13",
//       runningTotal: 2783,
//       wordcount: 261,
//     },
//     {
//       readdate: "2024-01-17",
//       runningTotal: 3179,
//       wordcount: 396,
//     },
//     {
//       readdate: "2024-02-26",
//       runningTotal: 3822,
//       wordcount: 643,
//     },
//     {
//       readdate: "2024-02-27",
//       runningTotal: 4046,
//       wordcount: 224,
//     },
//     {
//       readdate: "2024-02-28",
//       runningTotal: 4307,
//       wordcount: 261,
//     },
//     {
//       readdate: "2024-02-29",
//       runningTotal: 4477,
//       wordcount: 170,
//     },
//   ],
//   Spanish: [
//     {
//       readdate: "2024-09-28",
//       runningTotal: 0,
//       wordcount: 0,
//     },
//     {
//       readdate: "2024-09-29",
//       runningTotal: 337,
//       wordcount: 337,
//     },
//   ],
// };

// const transformed = [];
// Object.keys(data).forEach((lang) => {
//   data[lang].forEach((d) =>
//     transformed.push({
//       [lang]: { total: d.runningTotal, words: d.wordcount },
//       date: d.readdate,
//     })
//   );
// });

// const series = [];

// console.log(
//   Object.keys(data).forEach((lang) =>
//     series.push({
//       label: lang,
//       name: `${lang}.runningTotal`,
//       color: "indigo.6",
//     })
//   )
// );

const colors: Record<string, string> = {
  spanish: "indigo.6",
  german: "orange.4",
  greek: "yellow.5",
  russian: "blue.4",
  italian: "red.4",
};

const languages = ["spanish", "german", "greek", "russian", "italian"];

// console.log(Object.keys(data).map((lang) => ({ data: data[lang] })));

export function StatisticsPage() {
  return (
    <AreaChart
      // maxBarWidth={15}
      p="lg"
      type="stacked"
      withLegend
      // withPointLabels
      areaProps={{ isAnimationActive: true }}
      tooltipAnimationDuration={200}
      h={300}
      data={data}
      dataKey="date"
      series={languages.map((lang) => ({ name: lang, color: colors[lang] }))}
      // curveType="linear"
    />
  );
}
