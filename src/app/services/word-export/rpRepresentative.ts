import { 
    Alignment, AlignmentType,
    Document, HeadingLevel,
    Paragraph, Table, TabStopPosition, TabStopType,
    TextRun, UnderlineType,
    TableRow, TableCell,
    VerticalMergeType, BorderStyle, WidthType, PageOrientation, convertInchesToTwip, VerticalAlign } from "docx";
import { DatePipe } from '@angular/common';
import { AlignService } from '@progress/kendo-angular-popup';
import { IntlService } from "@progress/kendo-angular-intl";

export class DocumentCreator {
    constructor(
        public intl: IntlService,
    ) { }

    public create(data: any) {
        const document = new Document({
            sections: [{
                
                properties: {},
                children: [
                    this.createPrefixTitle0(),
                    this.createPrefixTitle1(),
                    this.createPrefixTable(data),
                    this.createPrefixTitle2(),
                    this.createPrefixTitle3("Kết quả thẩm tra tư cách đại biểu dự " + data.MeetingName),
                    this.createPrefixTitle3("------------"),
                    this.createContent("Hôm nay, vào hồi "+data.CurDate_HH+" giờ "+data.CurDate_mm+" phút, ngày "+data.CurDate_dd+" tháng "+data.CurDate_MM+" năm " +data.CurDate_yyyy ),
                    this.createContent("Ban Thẩm tra tư cách đại biểu " + data.MeetingName + " gồm các đồng chí: "),
                    ...data.BTTTCDBs.map((data: any, index: any) => {
                        const arr: Paragraph[] = [];
                        var num = index + 1
                        arr.push(this.createContent("- Đồng chí "+ data));
                        return arr
                    }).reduce((prev: any, curr: any) => prev.concat(curr), []),   
                    
                    this.createContent("Đã tiến hành làm việc và xin báo cáo kết quả thẩm tra tư cách đại biểu dự " + data.MeetingName + " như sau:"),
                    this.createContent("- Tổng số đại biểu được triệu tập: "+ data.ToTal +" đồng chí."),
                    this.createContent("- Số đại biểu có mặt: "+ data.CheckInCnt +" đồng chí."),
                    this.createContentBold("I. Thành phần đại biểu:"),
                    this.createContent("1. Tổng số đại biểu đương nhiên: "+ data.MemberRootCnt+" đồng chí = "+ data.MemberRootPer+"."),
                    this.createContent("2. Tổng số đại biểu do đại hội cấp dưới bầu: "+ data.MemberRegistCnt +" đồng chí = "+ data.MemberRegistPer +"."),
                    this.createContent("3. Tổng số đại biểu được chỉ định: "+data.MemberAssignCnt+" đồng chí = "+data.MemberAssignPer),
                    this.createContentBold("II. Phân tích chất lượng đại biểu:"),
                    this.createContent("1. Về giới tính: "),
                    this.createContent("- Đại biểu nam: "+ data.AccountMaleCnt +" đồng chí = "+ data.AccountMalePer +"."),
                    this.createContent("- Đại biểu nữ: "+ data.AccountFeMaleCnt +" đồng chí = "+ data.AccountFeMalePer +"."),
                    this.createContent("2. Đại biểu là Đảng viên Đảng Cộng sản Việt Nam: "+ data.MemberCommunistPartyCnt +" đồng chí = "+ data.MemberCommunistPartyPer +". "),
                    this.createContent("3. Đại biểu là người dân tộc thiểu số: "+ data.MemberEthnicSmallCnt +" đồng chí = "+ data.MemberEthnicSmallPer +"."),
                    this.createContent("4. Về cơ cấu khối đối tượng, khu vực địa bàn dân cư:"),
                    ...data.UnitTypes.map((data: any, index: any) => {
                            const arr: Paragraph[] = [];
                            var num = index + 1
                            arr.push(this.createContent("- "+ data.UnitTypeName +": " + data.UnitTypeCnt + " đồng chí = "+ data.UnitTypePerDouble +"%."));
                            return arr
                        }).reduce((prev: any, curr: any) => prev.concat(curr), []),     
                    this.createContent("5. Về trình độ chuyên môn (nêu cụ thể từng loại và tỉ lệ %):"),
                    ...data.Qualifications.map((data: any, index: any) => {
                        const arr: Paragraph[] = [];
                        var num = index + 1
                        arr.push(this.createContent("- "+ data.QualificationName +": " + data.QualificationCnt + " đồng chí = "+ data.QualificationPerDouble +"%."));
                        return arr
                    }).reduce((prev: any, curr: any) => prev.concat(curr), []),
                    this.createContent("6. Về trình độ lý luận chính trị (nêu cụ thể từng loại và tỉ lệ %):"),
                    ...data.PoliticalTheorys.map((data: any, index: any) => {
                        const arr: Paragraph[] = [];
                        var num = index + 1
                        arr.push(this.createContent("- "+ data.PoliticalTheoryName +": " + data.PoliticalTheoryCnt + " đồng chí = "+ data.PoliticalTheoryPerDouble +"%."));
                        return arr
                    }).reduce((prev: any, curr: any) => prev.concat(curr), []),
                    this.createContent("7. Tuổi bình quân của Đại biểu dự Đại hội là: "+ data.AgeAVG +" tuổi."),
                    this.createContent("8. Đại biểu trẻ tuổi nhất: Đồng chí "+ data.AgeMinAccountName +", "+ data.AgeMin +" tuổi."),
                    this.createContent("9. Đại biểu cao tuổi nhất: Đồng chí "+ data.AgeMaxAccountName +", "+ data.AgeMax +" tuổi."),
                    this.createContent("(Căn cứ vào tình hình thực tế đại biểu, có thể đưa thêm các thông số khác hoặc lược bớt các nội dung trên)."),
                    
                    this.createContent("Đến thời điểm này "+data.CheckInPer+" đại biểu chính thức của " + data.MeetingName + " đủ tư cách dự Đại hội; có … đồng chí không đủ tư cách dự "+ data.MeetingName +". Nếu có vấn đề gì phát sinh về tư cách đại biểu của Đại hội chúng tôi xin tiếp tục báo cáo. "),
                    this.createSignature("TRƯỞNG BAN")
                ]
            }],

        });

        return document;
    }
    public createPrefixTitle0(): Paragraph {
        return new Paragraph({
            spacing: {
                before: 0,
                after: 0
            },
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.TITLE,
            children: [
                new TextRun({
                    text: `MẪU 4`,
                    bold: true,
                    underline: {},
                    size: 28,
                    color: '#000000'
                }),
            ],
        });

    }

    public createPrefixTitle1(): Paragraph {
        return new Paragraph({
            spacing: {
                before: 0,
                after: 0
            },
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.TITLE,
            children: [
                new TextRun({
                    text: `BÁO CÁO THẨM TRA TƯ CÁCH ĐẠI BIỂU`,
                    bold: true,
                    size: 28,
                    color: '#000000'
                }),
            ],
        });

    }

    public createPrefixTitle2(): Paragraph {
        return new Paragraph({
            spacing: {
                before: 500,
                after: 0
            },
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.TITLE,
            children: [
                new TextRun({
                    text: `BÁO CÁO`,
                    bold: true,
                    size: 32,
                    color: '#000000'
                }),
            ],
        });

    }

    public createPrefixTitle3(text: any): Paragraph {
        return new Paragraph({
            spacing: {
                before: 0,
                after: 0
            },
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.TITLE,
            children: [
                new TextRun({
                    text: `${text}`,
                    bold: true,
                    size: 28,
                    color: '#000000'
                }),
            ],
        });

    }

    public createContent(title: string): Paragraph {
        return new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: {
                firstLine: 500
            },
            spacing: {
                before: 150,
                after: 0
            },
            children: [
                new TextRun({
                    text: `${title}`,
                    color: '#000000',
                    italics: false,
                    bold: false,
                    size: 28
                }),
            ]
        });
    }


    public createContentBold(title: string): Paragraph {
        return new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: {
                firstLine: 500
            },
            spacing: {
                before: 150,
                after: 0
            },
            children: [
                new TextRun({
                    text: `${title}`,
                    color: '#000000',
                    italics: false,
                    bold: true,
                    size: 28
                }),
            ]
        });
    }


    public createNormalHeading(customStr: string, customValue: string): Paragraph {
        return new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: {
                before: 150,
                after: 0
            },
            children: [
                new TextRun({
                    text: customStr != "" && customValue != "" ? `${customStr} ${customValue}` :
                        customStr == "" && customValue != "" ? `${customValue}` : `${customStr}`,
                    color: '#000000',
                    italics: false,
                    bold: false,
                    size: 28
                }),
            ]
        });
    }

    public createSignature(admin: string): Table {
      
        return new Table({
            width: {
                size: 100,
                type: WidthType.PERCENTAGE,
            },
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                
                            ],
                            borders: {
                                top: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "FF0000",
                                },
                                bottom: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "0000FF",
                                },
                                left: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "00FF00",
                                },
                                right: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "#ff8000",
                                },
                            },
                            width: {
                        size: 3005,
                        type: WidthType.DXA,
                    },
                        }), new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                spacing: {
                                    before: 200,
                                    after: 0
                                },
                                children: [
                                    new TextRun({
                                        text: 'TM. BAN THẨM TRA TƯ CÁCH ĐẠI BIỂU',
                                        color: '#000000',
                                        italics: false,
                                        bold: true,
                                        size: 28
                                    }),
                                ]
                            })],
                            borders: {
                                top: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "FF0000",
                                },
                                bottom: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "0000FF",
                                },
                                left: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "00FF00",
                                },
                                right: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "#ff8000",
                                },
                            },
                            width: {
                        size: 5000,
                        type: WidthType.DXA,
                    },

                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [],
                            borders: {
                                top: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "FF0000",
                                },
                                bottom: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "0000FF",
                                },
                                left: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "00FF00",
                                },
                                right: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "#ff8000",
                                },
                            },
                            width: {
                        size: 3005,
                        type: WidthType.DXA,
                    },
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                spacing: {
                                    before: 0,
                                    after: 0
                                },
                                children: [
                                    new TextRun({
                                        text: `${admin}`,
                                        color: '#000000',
                                        italics: false,
                                        bold: true,
                                        size: 28
                                    }),
                                ]
                            })],
                            borders: {
                                top: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "FF0000",
                                },
                                bottom: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "0000FF",
                                },
                                left: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "00FF00",
                                },
                                right: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "#ff8000",
                                },
                            },
                            width: {
                        size: 5000,
                        type: WidthType.DXA,
                    },
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [],
                            borders: {
                                top: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "FF0000",
                                },
                                bottom: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "0000FF",
                                },
                                left: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "00FF00",
                                },
                                right: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "#ff8000",
                                },
                            },
                            width: {
                        size: 3005,
                        type: WidthType.DXA,
                    },
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                spacing: {
                                    before: 0,
                                    after: 0
                                },
                                children: [
                                    new TextRun({
                                        text: `(Ký tên)`,
                                        color: '#000000',
                                        italics: true,
                                        bold: false,
                                        size: 28
                                    }),
                                ]
                            })],
                            borders: {
                                top: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "FF0000",
                                },
                                bottom: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "0000FF",
                                },
                                left: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "00FF00",
                                },
                                right: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "#ff8000",
                                },
                            },
                            width: {
                        size: 5000,
                        type: WidthType.DXA,
                    },
                        }),
                    ],
                }),
            ],
        })
    }

    public createBoldHeading(customStr: string): Paragraph {
        return new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: {
                before: 170,
                after: 0
            },
            children: [
                new TextRun({
                    text: `${customStr}`,
                    color: '#000000',
                    italics: false,
                    bold: true,
                    size: 30
                }),
            ]
        });
    }    

    public createPrefixTable(data: any): Table {
      
        return new Table({
            width: {
                size: 100,
                type: WidthType.PERCENTAGE,
            },
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                alignment: AlignmentType.CENTER,
                                spacing: {
                                    before: 0,
                                    after: 0
                                },
                                children: [
                                    new TextRun({
                                        text: `ĐẠI HỘI ĐẠI BIỂU`,
                                        color: '#000000',
                                        bold: true,
                                        size: 28,
                                        font: 'Times New Roman',
                                        break: 1
                                    }),
                                    new TextRun({
                                        text: `ĐOÀN TNCS HỒ CHÍ MINH`,
                                        color: '#000000',
                                        bold: true,
                                        size: 28,
                                        font: 'Times New Roman',
                                        break: 1
                                    }),
                                    new TextRun({
                                        text: `${data.MeetingName.toUpperCase()}`,
                                        color: '#000000',
                                        bold: true,
                                        size: 28,
                                        font: 'Times New Roman',
                                        break: 1
                                    }),
                                ]
                            })],
                            borders: {
                                top: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "FF0000",
                                },
                                bottom: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "0000FF",
                                },
                                left: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "00FF00",
                                },
                                right: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "#ff8000",
                                },
                            },
                            width: {
                        size: 7500,
                        type: WidthType.DXA,
                    },
                        }), 
                        new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                spacing: {
                                    before: 0,
                                    after: 0
                                },
                                children: [
                                    new TextRun({
                                        text: `ĐOÀN TNCS HỒ CHÍ MINH`,
                                        color: '#000000',
                                        bold: true,
                                        underline: {} ,
                                        size: 30,
                                        font: 'Times New Roman',
                                        break: 1
                                    }),
                                    new TextRun({
                                        text: `Tp.HCM, ngày ${data.CurDate_dd} tháng ${data.CurDate_MM} năm ${data.CurDate_yyyy}`,
                                        color: '#000000',
                                        italics: true,
                                        bold: false,
                                        size: 28 ,
                                        break: 1
                                    }),
                                ]
                            })],
                            borders: {
                                top: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "FF0000",
                                },
                                bottom: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "0000FF",
                                },
                                left: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "00FF00",
                                },
                                right: {
                                    style: BorderStyle.NONE,
                                    size: 3,
                                    color: "#ff8000",
                                },
                            },
                            width: {
                        size: 7000,
                        type: WidthType.DXA,
                    },

                        }),
                    ],
                }),
            ],
        })
    }

    public createPrefix(): Paragraph {
        return new Paragraph({
            heading: HeadingLevel.TITLE,
            indent: {
                left: -200,
                right: -5000
            },
            tabStops: [
                {
                    type: TabStopType.RIGHT,
                    position: TabStopPosition.MAX
                },
            ],
            children: [
                new TextRun({
                    text: `                  ĐẠI HỘI ĐẠI BIỂU                            `,
                    color: '#000000',
                    bold: true,
                    size: 28,
                    font: 'Times New Roman'
                }),
                new TextRun({
                    text: `ĐOÀN TNCS HỒ CHÍ MINH`,
                    color: '#000000',
                    underline: {},
                    bold: true,
                    size: 30,
                    font: 'Times New Roman'                    
                }),                         
                new TextRun({
                    text: `       ĐOÀN TNCS HỒ CHÍ MINH `,
                    color: '#000000',
                    bold: true,
                    size: 28,
                    font: 'Times New Roman',
                    break: 1
                }),
                new TextRun({
                    text: `                           …, ngày … tháng …  năm 20…`,
                    color: '#000000',
                    size: 28,
                    font: 'Times New Roman',
                    italics: true
                }),                
                new TextRun({
                    text: `                  HUYỆN/XÃ...............`,
                    color: '#000000',
                    bold: true,
                    size: 28,
                    font: 'Times New Roman',
                    break: 1
                }),
                new TextRun({
                    text: `         LẦN THỨ...., NHIỆM KỲ ......`,
                    color: '#000000',
                    size: 28,
                    bold: true,
                    font: 'Times New Roman',
                    break: 1
                }),
            ],
        });
    }

}   