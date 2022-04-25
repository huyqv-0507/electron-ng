import { Alignment, AlignmentType, Document, HeadingLevel, Packer, Paragraph, Table, TabStopPosition, TabStopType, TextRun, UnderlineType, TableRow, TableCell, VerticalMergeType, BorderStyle, WidthType, PageOrientation, convertInchesToTwip, VerticalAlign } from "docx";
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
                
                properties: {
                    page: {
                        size: {
                            orientation: PageOrientation.LANDSCAPE,
                        },
                    },
                },
                children: [
                    this.createPrefixTitle1(),
                    this.createPrefix(),
                    this.createPrefixTitle2(),
                    this.createPrefixTitle3(),
                    this.createTable(data),
                    // this.createTitle(meeting.Name),
                    // this.createFirstNormalHeading(meeting.StartAt),
                    // this.createNormalHeading("Địa điểm:", meeting.Address),
                    // this.createNormalHeading("Chủ tọa: Đ/c", dataAdmins != "" ? dataAdmins : "..........................................................................................................."),
                    // this.createNormalHeading("Thư ký: Đ/c", dataSecretaries != "" ? dataSecretaries : "............................................................................................................"),
                    // this.createNormalHeading("Thành phần:", ""),
                    // this.createNormalHeading("", members != "" ? members : "................................................................................................................................"),
                    // this.createNormalHeading("Vắng:", numAbsents),
                    // this.createNormalHeading("Lý do:", ""),
                    // this.createNormalHeading("................................................................................................................................................................................................................................................................", ""),
                    // this.createBoldHeading("I - CÁC VĂN BẢN TRIỂN KHAI TRONG CUỘC HỌP:"),
                    // ...dataDocuments.map((documents) => {
                    //     const arr: Paragraph[] = [];
                    //     arr.push(this.createNormalHeading(documents.Name, ""));
                    //     return arr
                    // }).reduce((prev, curr) => prev.concat(curr), []),
                    // this.createBoldHeading("II - NỘI DUNG CUỘC HỌP:"),
                    // ...dataIdeas.map((data, index) => {
                    //     const arr: Paragraph[] = [];
                    //     var num = index + 1
                    //     arr.push(this.createNormalHeading(num + "/ " + data.AccountName + ":", data.Description));
                    //     return arr
                    // }).reduce((prev, curr) => prev.concat(curr), []),
                    // this.createNormalHeading("N/ Đồng chí Chủ tọa kết luận:", ""),
                    // this.createNormalHeading("........................................................", ""),
                    // this.createNormalHeading("Biểu quyết:../….Đồng chí có mặt nhất trí với nội dung cuộc họp(đạt tỷ lệ: ….%)", ""),
                    // this.createLastNormalHeading(meeting.EndAt),
                    // this.createSignature(firstAdmin, firstSecretary)
                ]
            }],

        });

        return document;
    }

    public createPrefixTitle1(): Paragraph {
        return new Paragraph({
            spacing: {
                before: 400,
                after: 0
            },
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.HEADING_2,
            children: [
                new TextRun({
                    text: `MẪU 8: TRÍCH NGANG LÝ LỊCH NHÂN SỰ GIỚI THIỆU ỨNG CỬ VÀ CÔNG NHẬN CHỨC DANH`,
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
                before: 400,
                after: 0
            },
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.HEADING_2,
            children: [
                new TextRun({
                    text: `TRÍCH NGANG LÝ LỊCH`,
                    bold: true,
                    size: 32,
                    color: '#000000'
                }),
            ],
        });

    }

    public createPrefixTitle3(): Paragraph {
        return new Paragraph({
            spacing: {
                before: 400,
                after: 400
            },
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.HEADING_2,
            children: [
                new TextRun({
                    text: `NHÂN SỰ ………………………………………………`,
                    bold: true,
                    size: 28,
                    color: '#000000'
                }),
            ],
        });

    }

    public createTitle(title: string): Paragraph {
        return new Paragraph({
            spacing: {
                before: 200,
                after: 0
            },
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.HEADING_2,
            children: [
                new TextRun({
                    text: `${title}`,
                    color: '#000000',
                    italics: false,
                    bold: true,
                    size: 30
                }),
            ],
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

    public createSignature(admin: string, secretary: string): Table {
      
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
                                        before: 200,
                                        after: 0
                                    },
                                    children: [
                                        new TextRun({
                                            text: 'Thư ký',
                                            color: '#000000',
                                            italics: false,
                                            bold: false,
                                            size: 28
                                        }),
                                    ]
                                })
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
                        size: 3505,
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
                                        text: 'Chủ trì',
                                        color: '#000000',
                                        italics: false,
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
                        size: 3505,
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
                                    before: 1500,
                                    after: 0
                                },
                                children: [
                                    new TextRun({
                                        text: `${secretary}`,
                                        color: '#000000',
                                        italics: false,
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
                        size: 3505,
                        type: WidthType.DXA,
                    },
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                spacing: {
                                    before: 1500,
                                    after: 0
                                },
                                children: [
                                    new TextRun({
                                        text: `${admin}`,
                                        color: '#000000',
                                        italics: false,
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
                        size: 3505,
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


    public createPrefix(): Paragraph {
        return new Paragraph({
            heading: HeadingLevel.HEADING_2,
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
                    text: `                  .....................                                                                                             `,
                    color: '#000000',
                    bold: true,
                    size: 26,
                    font: 'Times New Roman'
                }),
                new TextRun({
                    text: `                                                                                                                           Mẫu M1`,
                    color: '#000000',
                    bold: true,
                    size: 16,
                    font: 'Times New Roman'                    
                }),                         
                new TextRun({
                    text: `         BAN CHẤP HÀNH..........                                                                                                             `,
                    color: '#000000',
                    bold: true,
                    size: 28,
                    font: 'Times New Roman',
                    break: 1
                }),
                new TextRun({
                    text: `ĐOÀN TNCS HỒ CHÍ MINH`,
                    bold: true,
                    color: '#000000',
                    underline: {},
                    size: 30,
                    font: 'Times New Roman'
                }),                
                new TextRun({
                    text: `                             ***                                              `,
                    color: '#000000',
                    bold: true,
                    size: 28,
                    font: 'Times New Roman',
                    break: 1
                }),
                new TextRun({
                    text: `                                                                          ........, ngày ... tháng ... năm ....`,
                    color: '#000000',
                    size: 28,
                    font: 'Times New Roman',
                    italics: true
                }),
            ],
        });
    }

    public createTableRow(
        stt: any, name: any,
        male: any, female: any,
        homeTown: any, ethnic: any,
        major: any, politicalTheory: any,
        dateUnion: any, dateParty: any,
        position: any, partyPostion: any, note: any): TableRow{
        return new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `${stt}`,
                                bold: true,
                                size: 20,
                                color: '#000000'
                            }),
                        ],
                    })],
                    margins: {         
                        top: convertInchesToTwip(0.05),                          
                        bottom: convertInchesToTwip(0.1),
                        right: convertInchesToTwip(0.1),
                        left: convertInchesToTwip(0.1),
                    },  
                    verticalAlign: VerticalAlign.CENTER,         
                }),
                new TableCell({
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `${name}`,
                                size: 20,
                                color: '#000000'
                            }),
                        ],
                    })],
                    margins: {  
                        top: convertInchesToTwip(0.05),                                 
                        bottom: convertInchesToTwip(0.1),
                        right: convertInchesToTwip(0.2),
                        left: convertInchesToTwip(0.2),
                    },
                    verticalAlign: VerticalAlign.CENTER,         
                }),
                new TableCell({
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `${male}`,
                                size: 20,
                                color: '#000000'
                            }),
                        ],
                    })],  
                    margins: {            
                        top: convertInchesToTwip(0.05),                       
                        bottom: convertInchesToTwip(0.1),
                        right: convertInchesToTwip(0.2),
                        left: convertInchesToTwip(0.2),
                    },
                    verticalAlign: VerticalAlign.CENTER,                                   
                }),
                new TableCell({
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `${female}`,
                                size: 20,
                                color: '#000000'
                            }),
                        ],
                    })],        
                    margins: {            
                        top: convertInchesToTwip(0.05),                       
                        bottom: convertInchesToTwip(0.1),
                        right: convertInchesToTwip(0.2),
                        left: convertInchesToTwip(0.2),
                    },
                    verticalAlign: VerticalAlign.CENTER,                            
                }),
                new TableCell({
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `${homeTown}`,
                                size: 20,
                                color: '#000000'
                            }),
                        ],
                    })],
                    margins: {            
                        top: convertInchesToTwip(0.05),                       
                        bottom: convertInchesToTwip(0.1),
                        right: convertInchesToTwip(0.2),
                        left: convertInchesToTwip(0.2),
                    },
                    verticalAlign: VerticalAlign.CENTER,         
                }),
                new TableCell({
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `${ethnic}`,
                                size: 20,
                                color: '#000000'
                            }),
                        ],
                    })],
                    margins: {               
                        top: convertInchesToTwip(0.05),                    
                        bottom: convertInchesToTwip(0.1),
                        right: convertInchesToTwip(0.2),
                        left: convertInchesToTwip(0.2),
                    },
                    verticalAlign: VerticalAlign.CENTER,         
                }),
                new TableCell({
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `${major}`,
                                size: 20,
                                color: '#000000'
                            }),
                        ],
                    })],  
                    margins: {               
                        top: convertInchesToTwip(0.05),                    
                        bottom: convertInchesToTwip(0.1),
                        right: convertInchesToTwip(0.1),
                        left: convertInchesToTwip(0.1),
                    },
                    verticalAlign: VerticalAlign.CENTER,                                   
                }),
                new TableCell({
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `${politicalTheory}`,
                                size: 20,
                                color: '#000000'
                            }),
                        ],
                    })],        
                    margins: {               
                        top: convertInchesToTwip(0.05),                    
                        bottom: convertInchesToTwip(0.1),
                        right: convertInchesToTwip(0.1),
                        left: convertInchesToTwip(0.1),
                    },
                    verticalAlign: VerticalAlign.CENTER,                            
                }),
                new TableCell({
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `${dateUnion}`,
                                size: 20,
                                color: '#000000'
                            }),
                        ],
                    })],
                    margins: {            
                        top: convertInchesToTwip(0.05),                       
                        bottom: convertInchesToTwip(0.1),
                        right: convertInchesToTwip(0.2),
                        left: convertInchesToTwip(0.2),
                    },
                    verticalAlign: VerticalAlign.CENTER,         
                }),
                new TableCell({
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `${dateParty}`,
                                size: 20,
                                color: '#000000'
                            }),
                        ],
                    })],
                    margins: {               
                        top: convertInchesToTwip(0.05),                    
                        bottom: convertInchesToTwip(0.1),
                        right: convertInchesToTwip(0.2),
                        left: convertInchesToTwip(0.2),
                    },
                    verticalAlign: VerticalAlign.CENTER,         
                }),
                new TableCell({
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `${position}`,
                                size: 20,
                                color: '#000000'
                            }),
                        ],
                    })],  
                    margins: {               
                        top: convertInchesToTwip(0.05),                    
                        bottom: convertInchesToTwip(0.1),
                        right: convertInchesToTwip(0.1),
                        left: convertInchesToTwip(0.1),
                    }, 
                    verticalAlign: VerticalAlign.CENTER,                                   
                }),
                new TableCell({
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `${partyPostion}`,
                                size: 20,
                                color: '#000000'
                            }),
                        ],
                    })],        
                    margins: {               
                        top: convertInchesToTwip(0.05),                    
                        bottom: convertInchesToTwip(0.1),
                        right: convertInchesToTwip(0.1),
                        left: convertInchesToTwip(0.1),
                    },
                    verticalAlign: VerticalAlign.CENTER,                            
                }),
                new TableCell({
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `${note}`,
                                size: 20,
                                color: '#000000'
                            }),
                        ],
                    })],        
                    margins: {               
                        top: convertInchesToTwip(0.05),                    
                        bottom: convertInchesToTwip(0.1),
                        right: convertInchesToTwip(0.1),
                        left: convertInchesToTwip(0.1),
                    },
                    verticalAlign: VerticalAlign.CENTER,                            
                }),
            ],
        })
    }

    public createTable(data: any): Table {
        const arr: TableRow[] = [];
        var a = new Table({
            rows: [               
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "TT",
                                        bold: true,
                                        size: 16,
                                        color: '#000000'
                                    }),
                                ],
                            })],   
                            margins: {         
                                top: convertInchesToTwip(0.05),                          
                                bottom: convertInchesToTwip(0.1),
                                right: convertInchesToTwip(0.1),
                                left: convertInchesToTwip(0.1),
                            },      
                            verticalAlign: VerticalAlign.CENTER,                 
                            rowSpan: 2,
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "HỌ VÀ TÊN",
                                        bold: true,
                                        size: 16,
                                        color: '#000000'
                                    }),
                                ],
                            })],    
                            margins: {  
                                top: convertInchesToTwip(0.05),                                 
                                bottom: convertInchesToTwip(0.1),
                                right: convertInchesToTwip(0.2),
                                left: convertInchesToTwip(0.2),
                            },   
                            width: {
                                size: 1405,
                                type: WidthType.DXA,
                            },      
                            verticalAlign: VerticalAlign.CENTER,                    
                            rowSpan: 2,
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "Năm sinh",
                                        bold: true,
                                        size: 16,
                                        color: '#000000'
                                    }),
                                ],
                            })],       
                            margins: {    
                                top: convertInchesToTwip(0.05),                               
                                bottom: convertInchesToTwip(0.1),
                                right: convertInchesToTwip(0.2),
                                left: convertInchesToTwip(0.2),
                            },   
                            width: {
                                size: 1900,
                                type: WidthType.DXA,
                            },
                            verticalAlign: VerticalAlign.CENTER,         
                            columnSpan: 2,
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "QUÊ QUÁN",
                                        bold: true,
                                        size: 16,
                                        color: '#000000'
                                    }),
                                ],
                            })],   
                            verticalAlign: VerticalAlign.CENTER,             
                            margins: {
                                top: convertInchesToTwip(0.05),   
                                bottom: convertInchesToTwip(0.1),
                                right: convertInchesToTwip(0.1),
                                left: convertInchesToTwip(0.1),
                            },   
                            width: {
                                size: 1400,
                                type: WidthType.DXA,
                            },           
                            rowSpan: 2,
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "DÂN TỘC",
                                        bold: true,
                                        size: 16,
                                        color: '#000000'
                                    }),
                                ],
                            })],       
                            verticalAlign: VerticalAlign.CENTER,           
                            margins: {           
                                top: convertInchesToTwip(0.05),                     
                                bottom: convertInchesToTwip(0.1),
                                right: convertInchesToTwip(0.1),
                                left: convertInchesToTwip(0.1),
                            },   
                            width: {
                                size: 1400,
                                type: WidthType.DXA,
                            },            
                            rowSpan: 2,
                        }),                        
                        new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "TRÌNH ĐỘ",
                                        bold: true,
                                        size: 16,
                                        color: '#000000'
                                    }),
                                ],
                            })],   
                            margins: {               
                                top: convertInchesToTwip(0.1),                    
                                bottom: convertInchesToTwip(0.1),
                                right: convertInchesToTwip(0.2),
                                left: convertInchesToTwip(0.25),
                            },  
                              
                            verticalAlign: VerticalAlign.CENTER,                               
                            columnSpan: 2,
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "Ngày vào Đoàn",
                                        bold: true,
                                        size: 16,
                                        color: '#000000'
                                    }),
                                ],
                            })],                               
                            margins: {               
                                top: convertInchesToTwip(0.1),                    
                                bottom: convertInchesToTwip(0.1),
                                right: convertInchesToTwip(0.1),
                                left: convertInchesToTwip(0.1),
                            },    
                            verticalAlign: VerticalAlign.CENTER,                               
                            rowSpan: 2,
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "Ngày vào Đảng",
                                        bold: true,
                                        size: 16,
                                        color: '#000000'
                                    }),
                                ],
                            })],      
                            margins: {               
                                top: convertInchesToTwip(0.1),                    
                                bottom: convertInchesToTwip(0.1),
                                right: convertInchesToTwip(0.1),
                                left: convertInchesToTwip(0.1),
                            },  
                            verticalAlign: VerticalAlign.CENTER,                               
                            rowSpan: 2,
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "CHỨC VỤ - ĐƠN VỊ CÔNG TÁC",
                                        bold: true,
                                        size: 16,
                                        color: '#000000'
                                    }),
                                ],
                            })],    
                            margins: {               
                                top: convertInchesToTwip(0.1),                    
                                bottom: convertInchesToTwip(0.1),
                                right: convertInchesToTwip(0.1),
                                left: convertInchesToTwip(0.1),
                            },  
                            verticalAlign: VerticalAlign.CENTER,                                
                            rowSpan: 2,
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "CHỨC VỤ ĐẢNG",
                                        bold: true,
                                        size: 16,
                                        color: '#000000'
                                    }),
                                ],
                            })],  
                            margins: {               
                                top: convertInchesToTwip(0.1),                    
                                bottom: convertInchesToTwip(0.1),
                                right: convertInchesToTwip(0.1),
                                left: convertInchesToTwip(0.1),
                            }, 
                            verticalAlign: VerticalAlign.CENTER,                                   
                            rowSpan: 2,
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "GHI CHÚ",
                                        bold: true,
                                        size: 16,
                                        color: '#000000'
                                    }),
                                ],
                            })],  
                            margins: {               
                                top: convertInchesToTwip(0.1),                    
                                bottom: convertInchesToTwip(0.1),
                                right: convertInchesToTwip(0.1),
                                left: convertInchesToTwip(0.1),
                            }, 
                            verticalAlign: VerticalAlign.CENTER,                                  
                            rowSpan: 2,
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "Nam",
                                        bold: true,
                                        size: 16,
                                        color: '#000000'
                                    }),
                                ],
                            })],
                            margins: {            
                                top: convertInchesToTwip(0.05),                       
                                bottom: convertInchesToTwip(0.1),
                                right: convertInchesToTwip(0.2),
                                left: convertInchesToTwip(0.2),
                            },
                            verticalAlign: VerticalAlign.CENTER,         
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "Nữ",
                                        bold: true,
                                        size: 16,
                                        color: '#000000'
                                    }),
                                ],
                            })],
                            margins: {               
                                top: convertInchesToTwip(0.05),                    
                                bottom: convertInchesToTwip(0.1),
                                right: convertInchesToTwip(0.2),
                                left: convertInchesToTwip(0.2),
                            },
                            verticalAlign: VerticalAlign.CENTER,         
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "Chuyên môn, nghiệp vụ",
                                        bold: true,
                                        size: 16,
                                        color: '#000000'
                                    }),
                                ],
                            })],  
                            margins: {               
                                top: convertInchesToTwip(0.05),                    
                                bottom: convertInchesToTwip(0.1),
                                right: convertInchesToTwip(0.1),
                                left: convertInchesToTwip(0.1),
                            },
                            width: {
                                size: 300,
                                type: WidthType.DXA,
                            }, 
                            verticalAlign: VerticalAlign.CENTER,                                   
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "Lý luận chính trị",
                                        bold: true,
                                        size: 16,
                                        color: '#000000'
                                    }),
                                ],
                            })],        
                            margins: {               
                                top: convertInchesToTwip(0.05),                    
                                bottom: convertInchesToTwip(0.1),
                                right: convertInchesToTwip(0.1),
                                left: convertInchesToTwip(0.1),
                            },
                            width: {
                                size: 400,
                                type: WidthType.DXA,
                            }, 
                            verticalAlign: VerticalAlign.CENTER,                            
                        }),
                    ],
                }),

            ],   
            alignment: AlignmentType.CENTER,
        });
        
        for(let i = 0; i< data.length; i ++){
            a.addChildElement(this.createTableRow(i+1, data[i].AccountName ? data[i].AccountName : '',
             data[i].BirthYearForFeMale ? data[i].BirthYearForFeMale : '',
             data[i].BirthYearForMale ? data[i].BirthYearForMale : '',
             data[i].HomeTown ? data[i].HomeTown : '',
             data[i].EthnicName ? data[i].EthnicName : '',
             data[i].Specialized ? data[i].Specialized : '', 
             data[i].PoliticalTheory ? data[i].PoliticalTheory : '', 
             data[i].YouthGroupDate ? this.intl.formatDate(new Date(data[i].YouthGroupDate), 'yyyy-MM-dd') : '', 
             data[i].CommunistPartyDate ? this.intl.formatDate(new Date(data[i].CommunistPartyDate), 'yyyy-MM-dd') : '',
             data[i].PositionName ? data[i].PositionName : '' + '-'+ data[i].UnitName  ? data[i].UnitName : '',
             data[i].CommunistPartyPosition ? data[i].CommunistPartyPosition : '', 
             data[i].Note ? data[i].Note : '' ));
        }       
        return a;
    }
}   