import { Alignment, AlignmentType, Document, HeadingLevel, Packer, Paragraph, Table, TabStopPosition, TabStopType, TextRun, UnderlineType, TableRow, TableCell, VerticalMergeType, BorderStyle, WidthType, PageOrientation, convertInchesToTwip, VerticalAlign } from "docx";
import { DatePipe } from '@angular/common';
import { AlignService } from '@progress/kendo-angular-popup';
import { IntlService } from "@progress/kendo-angular-intl";

export class DocumentCreator {
    constructor(
        public intl: IntlService,
    ) { }

    public create(data: any, data2: any, dataDS: any) {
        const document = new Document({
            sections: [{
                
                properties: {},
                children: [
                    this.createPrefixTitle0(),
                    this.createPrefixTitle1(),
                    this.createPrefixTable(data),
                    this.createPrefixTitle2(),
                    this.createPrefixTitle3("Bầu "+data.ElectionName),
                    this.createPrefixTitle3("------------"),
                    this.createContent("Vào hồi "+data.CurDate_HH+" giờ "+data.CurDate_mm+" phút, ngày "+data.CurDate_dd+" tháng "+data.CurDate_MM+" năm " +data.CurDate_yyyy  
                    +" "+data.MeetingName +" tiến hành bầu "+data.ElectionName+", Ban kiểm phiếu chúng tôi gồm:" ),
                
                    ...data.MemberBKPs.map((data: any, index: any) => {
                        const arr: Paragraph[] = [];
                        var num = index + 1
                        arr.push(this.createContent(num+". Đồng chí "+ data));
                        return arr
                    }).reduce((prev: any, curr: any) => prev.concat(curr), []),   
                    
                    this.createContent("Đã tiến hành kiểm phiếu bầu " + data.ElectionName + " với những nội dung cụ thể như sau:"),
                    this.createContent("1. Danh sách bầu cử: "+ data.ElectionName +" đã được Đại hội thông qua là "+data.Total+" đồng chí có tên sau: "),
                    
                    ...dataDS.Options.map((dataDS: any, index: any) => {
                        const arr: Paragraph[] = [];
                        var num = index + 1
                        arr.push(this.createContent( num +". Đồng chí "+ dataDS.Name));
                        return arr
                    }).reduce((prev: any, curr: any) => prev.concat(curr), []),   
                    this.createContent("2. Tình hình bầu cử: "),
                    this.createContent("- Tổng số đại biểu được triệu tập: "+ data.Total +" đồng chí."),
                    this.createContent("- Tổng số đại biểu có mặt: "+ data.MemberCheckinCnt +" đồng chí."),
                    this.createContent("- Tổng số phiếu phát ra: "+ data2.TotalOutput +" Phiếu."),
                    this.createContent("- Tổng số phiếu thu vào: "+ data2.TotalInput +" Phiếu."),
                    this.createContent("- Tổng số phiếu hợp lệ: "+ (data2.TotalInput - data2.TotalNotValid) +" Phiếu."),
                    this.createContent("- Tổng số phiếu không hợp lệ: "+ data2.TotalNotValid +" Phiếu."),
                    this.create2ContentInline("- Kết quả bầu cử cụ thể như sau"," (Ghi kết quả thứ tự theo danh sách bầu cử):" ),
                    
                    ...data2.Options.map((data2: any, index: any) => {
                        const arr: Paragraph[] = [];
                        var num = index + 1
                        arr.push(this.createContent(num +" "+data2.Name +": " + data2.ValueStr + " Phiếu = "+ data2.Per));
                        return arr
                    }).reduce((prev: any, curr: any) => prev.concat(curr), []),
                    
                    this.createContent("3.Theo quy định của Điều lệ Đoàn, các đồng chí sau đây trúng cử vào "+data.MeetingName+" (Ghi theo thứ tự kết quả bầu cử từ cao xuống thấp): "),
                    ...data2.Options.map((data2: any, index: any) => {
                        const arr: Paragraph[] = [];
                        if(data2.WinFlg == true){
                            arr.push(this.createContent("Đồng chí "+ data2.Name +": " + data2.ValueStr + " Phiếu = "+ data2.Per ));
                        }
                        return arr
                    }).reduce((prev: any, curr: any) => prev.concat(curr), []),
                    this.createContent("Chúng tôi lập biên bản này báo cáo kết quả trước Đại hội và làm căn cứ để Đoàn cấp trên công nhận. "),
                    this.createSignature()
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
                    text: `MẪU 6`,
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
                    text: `BIÊN BẢN KIỂM PHIẾU `,
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
                    text: `BIÊN BẢN KIỂM PHIẾU`,
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
                firstLine : 500
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
    public create2ContentInline(content1: string , content2 : string): Paragraph {
        return new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: {
                firstLine : 500
            },
            spacing: {
                before: 150,
                after: 0
            },
            children: [
                new TextRun({
                    text: `${content1}`,
                    color: '#000000',
                    italics: false,
                    bold: false,
                    size: 28
                }),
                new TextRun({
                    text: `${content2}`,
                    color: '#000000',
                    italics: true,
                    bold: true,
                    size: 28
                }),
            ] , 
            
        });
    }


    public createContentBold(title: string): Paragraph {
        return new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: {
                left: 500
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


    public createSignature(): Table {
      
        return new Table({
            width: {
                size: 100,
                type: WidthType.PERCENTAGE,
            },
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                spacing: {
                                    before: 200,
                                    after: 0
                                },
                                children: [
                                    new TextRun({
                                        text: 'TM. ĐOÀN CHỦ TỊCH',
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
                        }), new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                spacing: {
                                    before: 200,
                                    after: 0
                                },
                                children: [
                                    new TextRun({
                                        text: 'TM. BAN KIỂM PHIẾU',
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