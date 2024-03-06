// 引导对象
const homeStep = [
  {
    popoverClass: "driverjs-theme",
    animate: true,
    showProgress: false,
    nextBtnText: "已了解，下一步",
    doneBtnText: "完成",
    prevBtnText: "上一步",
    showButtons: ["next", "previous"],
    steps: [
      {
        element: "#statisticDataStep",
        popover: {
          title: "数据概览",
          description: "文档数据、问答访问实时掌控。",
        },
      },
      {
        element: "#ModuleStep",
        popover: {
          title: "常用功能",
          description: "更多知盒强大功能信手拈来",
        },
      },
      {
        element: "#incomeStep",
        popover: {
          title: "收益概要",
          description: "收支明细一目了然",
        },
      },
    ],
  },
];
// 引导对象
const zhiheStep = [
  {
    popoverClass: "driverjs-theme",
    animate: true,
    showProgress: false,
    nextBtnText: "已了解，下一步",
    doneBtnText: "完成",
    prevBtnText: "上一步",
    showButtons: ["next", "previous"],
    steps: [
      {
        element: "#createBtn",
        popover: {
          title: "新增文件",
          description: "创建新对话文件夹",
        },
      },
      {
        element: "#floderList",
        popover: {
          title: "对话列表",
          description: "查看已创建的文件对话",
        },
      },
      {
        element: "#uploadCard",
        popover: {
          title: "上传引导",
          description: "上传文件，了解知盒大模型",
        },
      },
    ],
  },
];

export { homeStep, zhiheStep };
