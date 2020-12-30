
import React, { useContext, useState, useEffect, useRef } from "react";

import ReactDOM from "react-dom";
import { message, Button, Select, Modal, DatePicker, TimePicker, version, Space } from "antd";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
const { Option } = Select;
const { RangePicker } = TimePicker;
import "antd/dist/antd.css";
import '../resource/index'

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const os = require('os');
console.log('os.arch:', os.arch());
console.log('os.platform:', os.platform());

// const info = (mes, type) => {
//     message.info(mes);
// };

import { Tabs } from "antd";
const { TabPane } = Tabs;

const info = (mes, type) => {
    if (type == 1) {
        Modal.confirm({
            title: 'Zpert',
            content: mes,
            centered: true,
            mask: false,
            maskClosable: false,
            okText: '确定',
            cancelText: '取消',
        });
    } else {
        Modal.info({
            title: 'Zpert',
            content: mes,
            centered: true,
            mask: false,
            maskClosable: false,
            okText: '确定',
        });
    }
};

const view_interface = require('./view').default.exports;
console.log(view_interface);
require('./mousetrap.min')


import { Menu, Dropdown, Divider, Tooltip, Input, InputNumber, Checkbox, ConfigProvider, Form, Row, Col, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {
    FileAddTwoTone,
    FolderOpenTwoTone,
    SaveTwoTone,
    PrinterTwoTone,
    CloseCircleTwoTone,
} from '@ant-design/icons';
const { SubMenu } = Menu;
const { TextArea } = Input;
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss'

{/* <Menu.Item style={{ marginLeft: 28, textAlign: "center", fontSize: '32px' }}><FileAddTwoTone style={{}} />新建</Menu.Item> */ }
{/* <Menu.Item style={menu_item_style} icon={<FileAddTwoTone />}><FileAddTwoTone style={menu_item_icon_style} />新建</Menu.Item> */ }
{/* <SubMenu title={<span style={{ lineHeight: "32px" }}>导出</span>} style={{ height: 100, lineHeight: "32px" }}></SubMenu> */ }
function ZMenuItem(props) { return (<Menu.Item style={{ lineHeight: "32px" }}></Menu.Item>); };


var { remote, shell, ipcRenderer } = require('electron');

ipcRenderer.on('savefile', function (event, arg) {
    view_interface.saveFile(arg);
})

function openUrl(url) {
    shell.openExternal(url).then(function () { console.log('打开成功！'); }, function (reaseon) {
        shell.openPath(url).then(function () { console.log('打开成功！') }, function (reason) {
            console.log(reason);
        });
    });
}

window.open = openUrl;

function handleClick(e) {
    switch (e.key) {
        case 'menu_newfile':
            view_interface.newFile();
            break;
        case 'menu_openfile':
            (function xml_openSelectionBox() {
                var inputObj = document.getElementById('my_inputObj');
                if (!inputObj) {
                    inputObj = document.createElement('input')
                    inputObj.setAttribute('id', 'my_inputObj');
                    inputObj.setAttribute('type', 'file');
                    inputObj.setAttribute("style", 'visibility:hidden');
                    document.body.appendChild(inputObj);
                }

                function xml_parse(e) {
                    const file = e.target.files[0];
                    console.log('opennew', e);
                    if (!file) {
                        console.log('empty');
                        document.body.removeChild(inputObj);
                        return;
                    }
                    view_interface.openFile(file.path);
                    document.body.removeChild(inputObj);
                }
                function delete_obj() {
                    console.log('cancle');
                    document.body.removeChild(inputObj);
                }

                inputObj.onchange = xml_parse;//选中文件时触发的方法
                inputObj.oncancel = delete_obj;
                inputObj.click();
            })();

            break;
        case 'menu_save':
            ipcRenderer.send("savefileas");
            break;
        case 'menu_saveas':
            ipcRenderer.send("savefileas");
            break;
        case 'menu_export_img':

            break;
        case 'menu_export_pdf':

            break;
        case 'menu_print':

            break;
        case 'menu_close':

            break;
        case 'menu_undo':
            view_interface.getView().OnEditUndo();
            break;
        case 'menu_redo':
            view_interface.getView().OnEditRedo();
            break;
        case 'menu_addwork':
            view_interface.addWork();
            break;
        case 'menu_addmilestone':
            view_interface.addMilestone();
            break;
        case 'menu_upgrade':
            view_interface.getView().OnUpGrade();
            break;
        case 'menu_downgrade':
            view_interface.getView().OnDownGrade();
            break;
        case 'menu_moveup':
            view_interface.getView().OnMoveUp();
            break;
        case 'menu_movedown':
            view_interface.getView().OnMoveDown();
            break;
        case 'menu_goout':
            view_interface.viewgoout();
            break;
        case 'menu_goin':
            view_interface.viewgoin();
            break;
        case 'menu_expand_or_collasped':
            view_interface.onCollapsed();
            break;
        case 'menu_expandtoall':
            view_interface.expandTo('全部展开');
            break;
        case 'menu_expandto1':
            view_interface.expandTo('层级1');
            break;
        case 'menu_expandto2':
            view_interface.expandTo('层级2');
            break;
        case 'menu_expandto3':
            view_interface.expandTo('层级3');
            break;
        case 'menu_expandto4':
            view_interface.expandTo('层级4');
            break;
        case 'menu_expandto5':
            view_interface.expandTo('层级5');
            break;
        case 'menu_expandto6':
            view_interface.expandTo('层级6');
            break;
        case 'menu_expandto7':
            view_interface.expandTo('层级7');
            break;
        case 'menu_expandto8':
            view_interface.expandTo('层级8');
            break;
        case 'menu_expandto9':
            view_interface.expandTo('层级9');
            break;
        case '双代号网络图':
            view_interface.changePertMode('timenet');
            break;
        case '横道图':
            view_interface.changePertMode('ganttnet');
            break;
        case 'menu_increase_hor_ratio':
            view_interface.getView().OnPertLargeHorRatio();
            break;
        case 'menu_decrease_hor_ratio':
            view_interface.getView().OnPertSmallHorRatio();
            break;
        case 'menu_increase_ver_height':
            view_interface.getView().OnPertLargeVerRatio();
            break;
        case 'menu_decrease_ver_height':
            view_interface.getView().OnPertSmallVerRatio();
            break;
        case 'menu_setupgeneral':
            view_interface.getView().OnSetUp();
            break;
        case 'menu_setupcalendar':
            view_interface.getView().OnSetUp();
            break;
        case 'menu_intelligentlayout':
            view_interface.getView().IntelligentLayout();
            break;
        case 'menu_zbra_website':
            openUrl("https://www.zpert.com");
            break;
        case 'menu_zbra_forum':
            openUrl("https://bbs.zpert.com");
            break;
        default:
            break;
    }
}

function formatNumber(value) {
    value += '';
    const list = value.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
        result = `,${num.slice(-3)}${result}`;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

class NumericInput extends React.Component {
    onChange = e => {
        const { value } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            this.props.onChange(value);
        }
    };

    // '.' at the end or only '-' in the input box.
    onBlur = () => {
        const { value, onBlur, onChange } = this.props;
        let valueTemp = value;
        if (value.charAt(value.length - 1) === '.' || value === '-') {
            valueTemp = value.slice(0, -1);
        }
        onChange(valueTemp.replace(/0*(\d+)/, '$1'));
        if (onBlur) {
            onBlur();
        }
    };

    render() {
        const { value } = this.props;
        const title = value ? (
            <span className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</span>
        ) : (
                'Input a number'
            );
        return (
            <Tooltip
                trigger={[]}
                title={title}
                placement="topLeft"
                overlayClassName="numeric-input"
            >
                <Input
                    {...this.props}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    placeholder="Input a number"
                    maxLength={25}
                />
            </Tooltip>
        );
    }
}
const EditableContext = React.createContext();
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async (e) => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
    }

    return <td {...restProps}>{childNode}</td>;
};

const DatePickerInput = ({ value = '', onChange, format = 'YYYY-MM-DD HH:mm', bordered = true, style = {} }) => {
    const [date, setDate] = useState(value || moment().format(format));
    const triggerChange = (changedValue) => {
        if (onChange) {
            onChange(changedValue);
        }
    };
    const onDateChange = e => {
        console.log('DatePickerInput', e);
        var newdate = e.format(format);
        setDate(newdate);
        triggerChange(newdate);
    }
    return (
        <DatePicker format={format} value={moment(value || date, format)} bordered={bordered} style={style} onChange={onDateChange} allowClear={false}></DatePicker>
    );
}

function CalendarSetup({ value = {}, onChange }) {
    var i = 0;
    for (var v in value.calendars) {
        // console.log(v);
        value.calendars[v].index = i;
        i++;
        if (value.calendars[v].vacation_rules) {
            var j = 0;
            for (var k in value.calendars[v].vacation_rules) {
                value.calendars[v].vacation_rules[k].key = j;
                j++;
            }
        }
        if (value.calendars[v].work_periods) {
            var j = 0;
            for (var k in value.calendars[v].work_periods) {
                value.calendars[v].work_periods[k].key = j;
                j++;
            }
        }
    }

    console.log('calendars', value);
    const [defaultid, setDefaultid] = useState(value.defaultid || 0);
    const [calendars, setCalendars] = useState(value.calendars || []);
    const [showcalendar, setShowCalendar] = useState(calendars.filter(function (k) { return k.id == defaultid; })[0] || {});

    const [newid, setNewid] = useState(-1);

    const triggerChange = (changedValue) => {
        if (onChange) {
            console.log('calendarchange', {
                defaultid, calendars, ...value, ...changedValue,
            });
            onChange({
                defaultid, calendars, ...value, ...changedValue,
            });
        }
    };
    const onUpdateCalendar = () => {
        const newData = [...showcalendar.vacation_rules];
        setDataSource(newData);
        // const newperiodsData = [...showcalendar.work_periods];
        // setPeriodDataSource(newperiodsData);
        triggerChange({
            calendars: calendars
        });
    }
    const onUpdateCalendarPeriods = () => {
        const newperiodsData = [...showcalendar.work_periods];
        setPeriodDataSource(newperiodsData);
        triggerChange({
            calendars: calendars
        });
    }
    const onCalendarChange = (newid) => {
        var new_show_calendar = calendars.filter(function (k) { return k.id == newid; })[0];
        setShowCalendar(new_show_calendar);
        const newData = new_show_calendar.vacation_rules ? [...new_show_calendar.vacation_rules] : [];
        setDataSource(newData);
        const newperiodsData = new_show_calendar.work_periods ? [...new_show_calendar.work_periods] : [];
        setPeriodDataSource(newperiodsData);
    };
    const onDefCalendarClick = e => {
        setDefaultid(showcalendar.id);
        triggerChange({
            defaultid: showcalendar.id
        });
    }
    const onNewCalendar = e => {
        var new_calendar = JSON.parse(JSON.stringify(showcalendar));
        new_calendar.id = newid;
        setNewid(newid - 1);
        new_calendar.name = '日历' + (calendars.length + 1);
        setShowCalendar(new_calendar);
        var temp = calendars;
        temp.push(new_calendar);
        setCalendars(temp);
        setShowCalendar(new_calendar);
        const newData = new_calendar.vacation_rules ? [...new_calendar.vacation_rules] : [];
        setDataSource(newData);
        triggerChange({
            calendars: calendars
        });
    }
    const onNewVacation = e => {
        if (!showcalendar.vacation_rules)
            showcalendar.vacation_rules = [];
        showcalendar.vacation_rules.push({
            name: '新假期',
            type: 0,
            start: moment.utc(moment().format('YYYY-MM-DD HH:mm')).unix(),
            stop: moment.utc(moment().format('YYYY-MM-DD HH:mm')).unix(),
            is_vacation: true,
            is_show_name: true,
            is_valid: true,
            back_color: 13154803,
            zoom_ratio: 100,
        });
        var j = 0;
        for (var k in showcalendar.vacation_rules) {
            showcalendar.vacation_rules[k].key = j;
            j++;
        }
        onUpdateCalendar();
    }



    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell
        }
    }
    const columns =
        [
            {
                title: '显示名称',
                dataIndex: 'is_show_name',
                key: 'is_show_name',
                width: 75,
                render: (text, record, index) => {
                    const onChange = (e) => {
                        record.is_show_name = e.target.checked;
                        onUpdateCalendar();
                        console.log(showcalendar);
                    };
                    return (<Checkbox onChange={onChange} defaultChecked={text}></Checkbox>);
                },
            },
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                width: 60,
                ellipsis: true,
                editable: true,
            },
            {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
                width: 90,
                render: (text, record, index) => {
                    // console.log('类型', text, record, index);
                    const onCalendarTypeChange = (newid) => {
                        console.log('newid', newid, record);
                        var old_type = record.type;
                        record.type = parseInt(newid);
                        if (old_type != record.type) {
                            console.log('reset');
                            if (record.type == 0) {
                                record.start = moment.utc(moment().format('YYYY-MM-DD HH:mm')).unix();
                                record.stop = moment.utc(moment().format('YYYY-MM-DD HH:mm')).unix();
                            } else if (record.type == 1) {
                                //周
                                record.start = 6;
                                record.stop = 0;
                            } if (record.type == 2) {
                                //月
                                record.start = 1;
                                record.stop = 1;
                            } if (record.type == 3) {
                                var current = moment.utc(moment().format('YYYY-MM-DD HH:mm'));
                                record.start = current.month() * 100 + current.date();
                                record.stop = current.month() * 100 + current.date();
                            }
                        }
                        onUpdateCalendar();
                        console.log('showcalendar', showcalendar);
                    };
                    return (<Select
                        defaultValue={text === 0 ? '按日期' : text === 1 ? '按周' : text === 2 ? '按月' : text === 3 ? '按年' : ''}
                        style={{ margin: 0, padding: 0, width: 80 }}
                        onChange={onCalendarTypeChange}
                        bordered={false}
                    >
                        <Option key={0}>按日期</Option>
                        <Option key={1}>按周</Option>
                        <Option key={2}>按月</Option>
                        <Option key={3}>按年</Option>
                    </Select>);
                }
            },
            {
                title: '开始',
                dataIndex: 'start',
                key: 'start',
                width: 120,
                render: (text, record, index) => {
                    const onCalendarStartChange = (data) => {
                        if (record.type == 0) {
                            record.start = moment.utc(data).unix();
                        } else if (record.type == 1) {
                            //周
                            record.start = data;
                        } else if (record.type == 2) {
                            //月
                            record.start = parseInt(data);
                        } if (record.type == 3) {
                            record.start = parseInt(data.slice(0, 2)) * 100 + parseInt(data.slice(3, 5));
                        }
                        onUpdateCalendar();
                    };
                    if (record.type == 0) {
                        return (
                            <DatePickerInput
                                value={moment.unix(text).utc().format('YYYY-MM-DD')}
                                format='YYYY-MM-DD'
                                onChange={onCalendarStartChange}
                                bordered={false}
                                style={{ margin: 0, padding: 0, width: 100 }}
                            >
                            </DatePickerInput>
                        );
                    } else if (record.type == 1) {
                        return (
                            <Select
                                value={text}
                                style={{ margin: 0, padding: 0, width: 110 }}
                                onChange={onCalendarStartChange}
                                bordered={false}
                            // showArrow={false}
                            >
                                <Option value={1}>周一</Option>
                                <Option value={2}>周二</Option>
                                <Option value={3}>周三</Option>
                                <Option value={4}>周四</Option>
                                <Option value={5}>周五</Option>
                                <Option value={6}>周六</Option>
                                <Option value={0}>周日</Option>
                            </Select>
                        );
                    }
                    else if (record.type == 2) {
                        return (
                            <DatePickerInput
                                value={`${text}`}
                                format='DD'
                                onChange={onCalendarStartChange}
                                bordered={false}
                                style={{ margin: 0, padding: 0, width: 100 }}
                            >
                            </DatePickerInput>
                        );
                    } else if (record.type == 3) {
                        return (
                            <DatePickerInput
                                value={`${parseInt(text / 100)}-${text % 100}`}
                                format='MM-DD'
                                onChange={onCalendarStartChange}
                                bordered={false}
                                style={{ margin: 0, padding: 0, width: 100 }}
                            >
                            </DatePickerInput>
                        );
                    }
                },
            },
            {
                title: '完成',
                dataIndex: 'stop',
                key: 'stop',
                width: 120,
                render: (text, record, index) => {
                    const onCalendarStopChange = (data) => {
                        if (record.type == 0) {
                            record.stop = moment.utc(data).unix();
                        } else if (record.type == 1) {
                            //周
                            record.stop = data;
                        } else if (record.type == 2) {
                            //月
                            record.stop = parseInt(data);
                        } if (record.type == 3) {
                            record.stop = parseInt(data.slice(0, 2)) * 100 + parseInt(data.slice(3, 5));
                        }
                        onUpdateCalendar();
                    };
                    if (record.type == 0) {
                        return (
                            <DatePickerInput
                                value={moment.unix(text).utc().format('YYYY-MM-DD')}
                                format='YYYY-MM-DD'
                                onChange={onCalendarStopChange}
                                bordered={false}
                                style={{ margin: 0, padding: 0, width: 100 }}
                            >
                            </DatePickerInput>
                        );
                    } else if (record.type == 1) {
                        return (
                            <Select
                                value={text}
                                style={{ margin: 0, padding: 0, width: 110 }}
                                onChange={onCalendarStopChange}
                                bordered={false}
                            // showArrow={false}
                            >
                                <Option value={1}>周一</Option>
                                <Option value={2}>周二</Option>
                                <Option value={3}>周三</Option>
                                <Option value={4}>周四</Option>
                                <Option value={5}>周五</Option>
                                <Option value={6}>周六</Option>
                                <Option value={0}>周日</Option>
                            </Select>
                        );
                    }
                    else if (record.type == 2) {
                        return (
                            <DatePickerInput
                                value={`${text}`}
                                format='DD'
                                onChange={onCalendarStopChange}
                                bordered={false}
                                style={{ margin: 0, padding: 0, width: 100 }}
                            >
                            </DatePickerInput>
                        );
                    } else if (record.type == 3) {
                        return (
                            <DatePickerInput
                                value={`${parseInt(text / 100)}-${text % 100}`}
                                format='MM-DD'
                                onChange={onCalendarStopChange}
                                bordered={false}
                                style={{ margin: 0, padding: 0, width: 100 }}
                            >
                            </DatePickerInput>
                        );
                    }
                },
            },
            {
                title: '持续时间',
                dataIndex: 'duration',
                key: 'duration',
                width: 80,
                editable: true,
            },
            {
                title: '休息',
                dataIndex: 'is_vacation',
                key: 'is_vacation',
                width: 90,
                render: (text, record, index) => {
                    console.log('表格刷新休息', text, record, record.is_valid ? (record.is_vacation ? '休息' : '工作') : '仅填充');
                    const onCalendarIsvacationChange = (newid) => {
                        console.log(record, newid, index);
                        if (newid === '仅填充')
                            record.is_valid = false;
                        else {
                            record.is_valid = true;
                            if (newid === '工作') {
                                record.is_vacation = false;
                            } else if (newid === '休息') {
                                record.is_vacation = true;
                            }
                        }
                        onUpdateCalendar();
                        console.log(showcalendar);
                    };
                    return (<Select
                        defaultValue={record.is_valid ? (record.is_vacation ? '休息' : '工作') : '仅填充'}
                        onChange={onCalendarIsvacationChange}
                        bordered={false}
                        style={{ margin: 0, padding: 0, width: 80 }}
                    >
                        <Option value='休息'>休息</Option>
                        <Option value='工作'>工作</Option>
                        <Option value='仅填充'>仅填充</Option>
                    </Select>);
                }
            },
            {
                title: '填充',
                dataIndex: 'back_color',
                key: 'back_color',
                width: 80,
                render: (text, record, index) => {
                    const onCalendarBackColorChange = (newcolor) => {
                        record.back_color = newcolor.r | newcolor.g << 8 | newcolor.b << 16;
                        onUpdateCalendar();
                    };

                    const ColorButton = ({ value = { r: '241', g: '112', b: '19', a: '1', }, onChange }) => {
                        const [color, setColor] = useState(value);
                        const handleChange = (color) => {
                            setColor(color.rgb);
                        };
                        const onDropdownVisibleChange = e => {
                            if (e == false) {
                                if (onChange) {
                                    onChange(color);
                                }
                            }
                        }
                        return (
                            <Select
                                dropdownRender={e => (
                                    <div >
                                        {/* {e} */}
                                        <div style={{ display: 'flex', flexWrap: 'nowrap', fontSize: 14, color: `rgba(${0}, ${0}, ${0}, ${0.85})` }}>
                                            <SketchPicker color={color} onChange={handleChange} />
                                        </div>
                                    </div>)}
                                dropdownMatchSelectWidth={false}
                                showArrow={false}
                                bordered={false}
                                onDropdownVisibleChange={onDropdownVisibleChange}
                                style={{ width: 60, backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`, borderRadius: 4, }}
                            >
                            </Select>
                        );
                    }
                    return (
                        <ColorButton
                            value={{ r: text & 255, g: (text >> 8) & 255, b: (text >> 16) & 255, a: 1 }}
                            onChange={onCalendarBackColorChange}
                        />
                    );
                }
            },
        ];
    const [dataSource, setDataSource] = useState(showcalendar.vacation_rules);
    const [perioddataSource, setPeriodDataSource] = useState(showcalendar.work_periods);
    const handleSave = (row) => {
        const index = showcalendar.vacation_rules.findIndex((item) => row.key === item.key);
        const item = showcalendar.vacation_rules[index];
        showcalendar.vacation_rules.splice(index, 1, { ...item, ...row });
        console.log('handleSave', row, item);
        onUpdateCalendar();
    };
    const show_columns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return (col.title === '名称' || col.title === '持续时间') ? {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleSave,
            }),
        } : col;
    });


    return (
        <div style={{ marginTop: 8 }}>
            <Row gutter={[8, 24]}>
                <span style={{ marginLeft: 8, paddingLeft: 8 }}>日历名称:</span>
                <Select
                    // defaultValue={showcalendar.name + "(默认)" || ""}
                    value={showcalendar.id}
                    style={{ width: 160, margin: '0 0 0 14px', }}
                    onChange={onCalendarChange}
                >
                    {calendars.map(item => (
                        <Option key={item.id} value={item.id}>{item.name + (item.id == defaultid ? "(默认)" : "")}</Option>
                    ))}
                </Select>
                <Button type="primary" style={{ marginLeft: 8, paddingLeft: 8, paddingRight: 8 }} onClick={onDefCalendarClick}>设为默认日历</Button>
                <Button type="primary" style={{ marginLeft: 8, paddingLeft: 8, paddingRight: 8 }} onClick={onNewCalendar}>新建日历</Button>
                <Button type="primary" style={{ marginLeft: 8, paddingLeft: 8, paddingRight: 8 }}>删除当前日历</Button>
            </Row>
            <Row gutter={8}>
                <Col flex="340px" className="ant-col-table" style={{ width: "400px" }}>
                    <section style={{ marginTop: 5, paddingTop: 14, border: "1px solid #f0f0f0" }}>
                        <div style={{ position: "absolute", top: "-14px", marginTop: 5, marginLeft: 8, lineHeight: 2, padding: "1px 4px", background: "#fff" }}>
                            休息日/阶段设置
                                        </div>
                        <div >
                            <Button type="primary" style={{ marginLeft: 8, paddingLeft: 8, paddingRight: 8 }} onClick={onNewVacation}>插入</Button>
                            <Button type="primary" style={{ marginLeft: 8, paddingLeft: 8, paddingRight: 8 }} onClick={onNewVacation}>删除</Button>
                            <Button type="primary" style={{ marginLeft: 8, paddingLeft: 8, paddingRight: 8 }} onClick={onNewVacation}>上移</Button>
                            <Button type="primary" style={{ marginLeft: 8, paddingLeft: 8, paddingRight: 8 }} onClick={onNewVacation}>下移</Button>
                        </div>
                        <div style={{ height: 200 }}>
                            <Table
                                dataSource={dataSource}
                                columns={show_columns}
                                components={components}
                                bordered
                                tableLayout="fixed"
                                pagination={false}
                                scroll={{ x: 500, y: 160 }}></Table>

                        </div>
                    </section>
                </Col>
                <Col flex="140px" style={{ width: "140px" }}>
                    <section style={{ marginTop: 5, paddingTop: 14, border: "1px solid #f0f0f0" }}>
                        <div style={{ position: "absolute", top: "-14px", marginTop: 5, marginLeft: 8, lineHeight: 2, padding: "1px 4px", background: "#fff" }}>
                            工作时间设置
                                        </div>
                        <div >
                            <Input style={{ width: 50, marginLeft: 8, paddingLeft: 8, paddingRight: 8 }} ></Input>
                            <span style={{ paddingLeft: 8 }}>小时</span>
                        </div>
                        <div style={{ height: 200 }}>
                            <Table
                                dataSource={perioddataSource}
                                // dataSource={perioddataSource}
                                columns={[
                                    {
                                        title: '开始',
                                        dataIndex: 'start',
                                        key: 'start',
                                        render: (text, record, index) => {
                                            console.log('开始', text, record);
                                            const onCalendarWorkPerStartChange = e => {
                                                var s = e[0].format('HH:mm')
                                                console.log(s);
                                                record[0] = (parseInt(s.slice(0, 2)) * 60 + parseInt(s.slice(3, 5))) * 60;
                                                s = e[1].format('HH:mm')
                                                console.log(s);
                                                record[1] = (parseInt(s.slice(0, 2)) * 60 + parseInt(s.slice(3, 5))) * 60;
                                                console.log('onCalendarWorkPerStartChange', e, record);
                                                onUpdateCalendarPeriods();
                                            }
                                            return ({
                                                children: <RangePicker
                                                    className="table_time_range_picker"
                                                    allowClear={false}
                                                    value={[moment(`${record[0] / 60 / 60}-${record[0] / 60 % 60}`, 'HH:mm'), moment(`${record[1] / 60 / 60}-${record[1] / 60 % 60}`, 'HH:mm')]}
                                                    format='HH:mm'
                                                    onChange={onCalendarWorkPerStartChange}
                                                    bordered={false}
                                                    style={{ margin: 0, padding: 0, width: 110 }}
                                                >
                                                </RangePicker >,
                                                props: {
                                                    colSpan: 2
                                                }
                                            }
                                            );
                                        }
                                    },
                                    {
                                        title: '完成',
                                        dataIndex: 'stop',
                                        key: 'stop',
                                        render: (text, record, index) => {
                                            const obj = {
                                                children: value,
                                                props: {},
                                            };
                                            obj.props.colSpan = 0;
                                            return obj;
                                        }
                                    },

                                ]}
                                bordered
                                tableLayout="fixed"
                                pagination={false}
                            // scroll={{ y: 160 }}
                            ></Table>
                        </div>

                    </section>
                </Col>
            </Row >
            <Row gutter={8}>
                <span style={{ marginLeft: 8, paddingLeft: 8, paddingRight: 8 }}>
                    提示:当同一日期被设置多个【休息】/【工作】状态时，以最后一条设置为准。可以通过【上移】/【下移】命令，改变【休息】状态的优先级。
                                </span>
            </Row>
        </div >
    );
}

function GeneralSetUp({ value = {}, onChange }) {
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 17 },
    };

    const DurationInput = ({ value = {}, onChange }) => {
        const [number, setNumber] = useState(1);
        const [currency, setCurrency] = useState(0);

        const triggerChange = (changedValue) => {
            if (onChange) {
                console.log('onchange', number, currency, {
                    number, currency, ...value, ...changedValue,
                });
                onChange({
                    number, currency, ...value, ...changedValue,
                });
            }
        };
        const onNumberChange = (e) => {
            const newNumber = parseInt(e.target.value || 1, 10);
            if (Number.isNaN(number)) {
                return;
            }
            if (!('number' in value)) {
                setNumber(newNumber);
            }
            triggerChange({
                number: newNumber,
            });
        }
        const onCurrencyChange = (newCurrency) => {
            console.log(newCurrency);
            if (!('currency' in value)) {
                setCurrency(newCurrency);
            }

            triggerChange({
                currency: newCurrency,
            });
        };
        return (
            <span>
                <Input
                    type="text"
                    value={value.number || number}
                    onChange={onNumberChange}
                    style={{ width: 60, }}
                />
                <Select
                    value={value.currency || currency}
                    style={{
                        width: 90,
                        margin: '0 8px',
                    }}
                    onChange={onCurrencyChange}
                >
                    <Option value={0}>自然日</Option>
                    <Option value={1}>自然时</Option>
                    <Option value={2}>自然分</Option>
                </Select>
            </span>
        );
    };

    // const onFinish = values => {
    //     // console.log('Success:', values);
    //     // if (onOK) {
    //     //     onOK(values);
    //     // }
    // };
    // const onFinishFailed = errorInfo => {
    //     // console.log('Failed:', errorInfo);
    // };
    const onValuesChange = value => {
        if (onChange) {
            onChange(value);
        }
    }
    // console.log('refreshGeneralSetUp', value)
    return (
        <>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="常规" key="1">
                    <Form
                        layout="vertical"
                        name="basic"
                        initialValues={{
                            planname: value.planname || '',
                            tag: value.tag || '',
                            describe: value.describe || '',
                        }}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        onValuesChange={onValuesChange}
                        validateTrigger={["onBlur", "onChange"]}
                    >
                        <Form.Item label="计划名称:" name="planname" rules={[{ required: false, message: 'Please input your username!' }]} >
                            <Input ></Input>
                        </Form.Item>
                        <Form.Item label="标签:" name="tag" rules={[{ required: false, message: 'Please input your username!' }]} >
                            <Input placeholder="空格分隔的标签，例如：住宅小区 框架剪力墙结构"></Input>
                        </Form.Item>
                        <Form.Item label="计划简介:" name="describe" rules={[{ required: false, message: 'Please input your username!' }]} >
                            <TextArea rows={2} />
                        </Form.Item>
                    </Form>
                    <Form
                        layout="inline"
                        name="basic"
                        initialValues={{
                            ask_start_time: value.ask_start_time || '',
                            ask_stop_time: value.ask_stop_time || '',
                            schedule: value.schedule || 0,
                            // askduration: { number: value.askduration || 1, currency: value.durationunit ? (value.durationunit == 0 ? 'day' : (value.durationunit == 1 ? 'hour' : 'minute')) : 'day' },
                            askduration: { number: value.askduration || 1, currency: value.durationunit || 0 },
                        }}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        onValuesChange={onValuesChange}
                        validateTrigger={["onBlur", "onChange"]}
                    >
                        <Form.Item label="要求开始时间:" name="ask_start_time" rules={[{ required: true, message: '日期不能为空!' }]}>
                            <DatePickerInput format='YYYY-MM-DD HH:mm' />
                        </Form.Item>

                        <Form.Item label="要求总工期:" name="askduration" rules={[{ required: true, message: '日期不能为空' }]}>
                            <DurationInput ></DurationInput>
                        </Form.Item>


                        <Form.Item label="要求结束时间:" name="ask_stop_time" rules={[{ required: true, message: '日期不能为空' }]} >
                            {/* <DatePicker format="YYYY-MM-DD HH:mm" allowClear={false}></DatePicker> */}
                            <DatePickerInput format='YYYY-MM-DD HH:mm' />
                        </Form.Item>
                        <Form.Item label="排网方式:" name="schedule" rules={[{ required: true, message: 'Please input your !' }]} >
                            <Select
                                value={0}
                                style={{
                                    width: 160,
                                    margin: '0 0 0 14px',
                                }}
                            >
                                <Option value={0}>越早越好</Option>
                                <Option value={1}>越晚越好</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item hidden={true}>
                            <Button type="primary" htmlType="submit" id="setup_form_1"></Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab="日历" key="2">
                    <Form
                        layout="horizontal"
                        name="basic"
                        initialValues={{
                            calendar: value.calendar || {},
                        }}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        onValuesChange={onValuesChange}
                        validateTrigger={["onBlur", "onChange"]}
                        size='small'
                    >
                        <Form.Item noStyle name="calendar" >
                            <CalendarSetup />
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
        </>
    );
}

const SetupPage = ({ value = {}, onChange, onOk }) => {
    const [isvisible, setVisible] = useState(false);

    const setupOk = e => {
        setVisible(false);
        if (onOk) {
            onOk(e);
        }
    };
    const setupCancel = e => {
        console.log('setupcancle');
        setVisible(false);
    };
    const onDataChange = e => {
        if (onChange) {
            onChange(e);
        }
    }
    const showModal = e => {
        setVisible(true);
    }

    return (
        <>
            <Button style={{ display: "none" }} type="primary" onClick={showModal} id="modalbutton"> Open Modal </Button>
            <Modal
                title='Zpert'
                width={620}
                visible={isvisible}
                onOk={setupOk}
                onCancel={setupCancel}
                okText='确定'
                cancelText='取消'
                centered={true}
                mask={false}
                maskClosable={false}
                destroyOnClose={true}
            >
                <GeneralSetUp value={value} onChange={onDataChange} ></GeneralSetUp>
            </Modal>
        </>
    );
}

class BtnGroup extends React.Component {
    constructor(props) {
        super(props);
        console.log('dirname', __dirname)
        this.state = {
            pertMode: props.pertMode, menu: props.menu, style: props.style,
            collapsed: "折叠/展开", is_show_btn_text: true, ver_height: '', hor_ratio: '', setup_data: {}, update_data: {}, setup_callback: undefined,
        };
    }
    onSetUpDataChange = e => {
        var new_update_data = { ...this.state.update_data, ...e };
        console.log('onSetUpDataChange', e);
        this.setState({
            update_data: new_update_data
        });
        console.log(new_update_data);
    }
    onSetupOk = e => {
        console.log('ok', this.state.update_data);
        this.state.setup_callback({ result: this.state.update_data });
    }

    initView() {
        view_interface.initwasm({
            call_back: {
                updateMenu: (e) => {
                    this.updateMenu(e);
                }
            },
            createSettingDialog: (data) => {
                console.log('createdialog', data);
                return new Promise((resolve, reject) => {
                    this.setState({ setup_data: data });
                    this.setState({ update_data: {} });
                    document.getElementById('modalbutton').click();
                    this.setState({ setup_callback: resolve });
                    // this.setupOk = e => {
                    //     console.log('resolve')
                    //     resolve({ result: { date: "2020-12-14" } });
                    // };
                });
            }
        });
        view_interface.setMessageBox(info);
    }

    updateMenu(info) {
        console.log(info);
        if (info.edit_width) { this.setState({ hor_ratio: info.edit_width }); }
        if (info.edit_height) { this.setState({ ver_height: info.edit_height }); }
    }

    componentDidMount() {
        console.log('initview', this.state)
        this.initView();

        Mousetrap.bind('alt+shift+left', () => { this.OnUpGrade(); return false; },);
        Mousetrap.bind('alt+shift+right', () => { this.OnDownGrade(); return false; },);
        Mousetrap.bind('mod+alt+up', () => { this.OnMoveUp(); return false; },);
        Mousetrap.bind('mod+alt+down', () => { this.OnMoveDown(); return false; },);
        Mousetrap.bind('shift+alt+up', () => { this.OnGoOut(); return false; },);
        Mousetrap.bind('shift+alt+down', () => { this.OnGoIn(); return false; },);
        Mousetrap.bind('ctrl+w', () => { this.AddWork(); return false; });
        Mousetrap.bind('ctrl+m', () => { this.AddMilestone(); return false; });
        Mousetrap.bind('ctrl+z', () => { handleClick({ key: "menu_undo" }); return false; });
        Mousetrap.bind('ctrl+y', () => { handleClick({ key: "menu_redo" }); return false; });
        Mousetrap.bind('ctrl+c', () => { console.log('复制'); return false; });
        Mousetrap.bind('ctrl+v', () => { console.log('粘贴'); return false; });
        Mousetrap.bind('ctrl+1', () => { console.log('设置'); return false; });
        Mousetrap.bind('del', () => { view_interface.getView().OnDelete(); return false; });
        // var js = document.createElement('script');
        // js.async = false;
        // js.type = 'text/javascript';
        // js.src = "js/zpert.js";
        // js.onload = function () {
        //     console.log(this);
        //     // this.initView();
        // }
        // document.getElementsByTagName('head')[0].appendChild(js);
    }

    onChangePertMode = (e) => {
        handleClick(e);
        this.setState({
            pertMode: e.key
        });
    };

    pert_mode_menu = (
        <Menu onClick={this.onChangePertMode}>
            <Menu.Item style={this.menu_item_style} key="双代号网络图"><span>双代号网络图</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="横道图"><span>横道图</span></Menu.Item>
        </Menu>
    );

    onCollapsed = (e) => {
        handleClick(e);
    }

    collapse_menu = (
        <Menu onClick={this.onCollapsed}>
            <Menu.Item key="menu_expandtoall">全部展开</Menu.Item>
            <Menu.Item key="menu_expandto1">层级1</Menu.Item>
            <Menu.Item key="menu_expandto2">层级2</Menu.Item>
            <Menu.Item key="menu_expandto3">层级3</Menu.Item>
            <Menu.Item key="menu_expandto4">层级4</Menu.Item>
            <Menu.Item key="menu_expandto5">层级5</Menu.Item>
            <Menu.Item key="menu_expandto6">层级6</Menu.Item>
            <Menu.Item key="menu_expandto7">层级7</Menu.Item>
            <Menu.Item key="menu_expandto8">层级8</Menu.Item>
            <Menu.Item key="menu_expandto9">层级9</Menu.Item>
        </Menu>
    );
    HeartSvg = (props) => (
        <>
            <svg className="menu_icon" viewBox="0 0 64 64"> <use xlinkHref={`#icon-${props.iconClass}`} /> </svg>
        </>
    );
    IconBtn = (props) => {
        return (
            <Tooltip placement="bottomLeft" title={props.title} color='white' mouseEnterDelay={0.005} mouseLeaveDelay={0.005}>
                {/* <Button style={{ paddingRight: 4, paddingLeft: props.paddingLeft != undefined ? props.paddingLeft : 4 }} type="text"
                    icon={<this.HeartSvg iconClass={props.iconClass} />} onClick={props.onClick}>
                    {this.state.is_show_btn_text ? props.content : " "}
                </Button> */}
                <div className="antd-my-btn" style={{ display: "inline-block" }} onClick={props.onClick}>
                    <this.HeartSvg iconClass={props.iconClass} />
                    <span >{this.state.is_show_btn_text ? props.content : " "}</span>
                </div>
            </Tooltip>
        );
    }

    BtnIcon = (props) => {
        return (
            <Tooltip placement="bottomLeft" title={props.title} color='white' mouseEnterDelay={0.005} mouseLeaveDelay={0.005}>
                {/* <span>{props.content}</span>
                <Button style={{ padding: 4 }} type="text" icon={<this.HeartSvg iconClass={props.iconClass} />} onClick={props.onClick}>{" "}</Button> */}
                <div className="antd-my-btn" style={{ display: "inline-block" }} onClick={props.onClick}>
                    <span >{this.state.is_show_btn_text ? props.content : " "}</span>
                    <this.HeartSvg iconClass={props.iconClass} />
                </div>
            </Tooltip>
        );
    }


    // this.setState({ is_show_btn_text: true });
    OnUpGrade = () => { handleClick({ key: "menu_upgrade" }); }
    OnDownGrade = () => { handleClick({ key: "menu_downgrade" }); }
    OnGoIn = () => { handleClick({ key: "menu_goin" }); }
    OnGoOut = () => { handleClick({ key: "menu_goout" }); }
    OnMoveUp = () => { handleClick({ key: "menu_moveup" }); }
    OnMoveDown = () => { handleClick({ key: "menu_movedown" }); }
    AddWork = () => { handleClick({ key: "menu_addwork" }); }
    AddMilestone = () => { handleClick({ key: "menu_addmilestone" }); }
    IntelligentLayout = () => { handleClick({ key: "menu_intelligentlayout" });; }
    OnSetHorRatio = () => {
        var value = this.state.hor_ratio;
        if (value != '') {
            this.setState({ hor_ratio: value });
            view_interface.getView().SetHorRatio(parseFloat(value));
        }

    }
    OnSetVerHeight = (value) => {
        var value = this.state.ver_height;
        if (value != '') {
            if (parseInt(value) < 1)
                this.setState({ ver_height: '1' });
            else
                this.setState({ ver_height: value });
            view_interface.getView().SetVerHeight(Math.max(parseInt(value), 1));
        }
    }
    OnPertLargeHorRatio = () => { handleClick({ key: "menu_increase_hor_ratio" }); }
    OnPertSmallHorRatio = () => { handleClick({ key: "menu_decrease_hor_ratio" }); }
    OnPertLargeVerRatio = () => { handleClick({ key: "menu_increase_ver_height" }); }
    OnPertSmallVerRatio = () => { handleClick({ key: "menu_decrease_ver_height" }); }

    render() {
        console.log('refresh')
        return (
            <div>
                <Dropdown overlay={this.pert_mode_menu} placement="bottomLeft" trigger={['hover']} >
                    <Button style={{ marginLeft: 8, padding: 4 }} type="text">{this.state.pertMode}<DownOutlined /></Button>
                </Dropdown >
                <Divider type="vertical" />
                <Dropdown overlay={this.collapse_menu} placement="bottomLeft" trigger={['hover']} >
                    <Button style={{ padding: 4 }} type="text">{this.state.collapsed}<DownOutlined /></Button>
                </Dropdown >
                <this.IconBtn iconClass="升级" title="升级(Ctrl+Shift+←)" content="升级" onClick={this.OnUpGrade} />
                <this.IconBtn iconClass="降级" title="降级(Ctrl+Shift+→)" content="降级" onClick={this.OnDownGrade} />
                <this.IconBtn iconClass="上钻" title="上钻(Shift+Alt+↑)" content="上钻" onClick={this.OnGoOut} />
                <this.IconBtn iconClass="下钻" title="下钻(Shift+Alt+↓)" content="下钻" onClick={this.OnGoIn} />
                <this.IconBtn iconClass="上移" title="上移(Ctrl+Alt+↑)" content="上移" onClick={this.OnMoveUp} />
                <this.IconBtn iconClass="下移" title="下移(Ctrl+Alt+↓)" content="下移" onClick={this.OnMoveDown} />
                <Divider type="vertical" />
                <this.IconBtn iconClass="添加工作" title="添加工作(Ctrl+W)" content="添加工作" onClick={this.AddWork} />
                <this.IconBtn iconClass="添加里程碑" title="添加里程碑(Ctrl+M)" content="添加里程碑" onClick={this.AddMilestone} />
                <Divider type="vertical" />
                <this.BtnIcon iconClass="宽度大" title="横向撑长网络" content="宽度" onClick={this.OnPertLargeHorRatio} />
                <NumericInput style={{ width: 50, height: 28, padding: 2 }} value={this.state.hor_ratio} onChange={(v) => { this.setState({ hor_ratio: v }); }} onBlur={this.OnSetHorRatio} />
                <this.IconBtn iconClass="宽度小" title="横向压缩网络" content=" " onClick={this.OnPertSmallHorRatio} />
                <this.BtnIcon iconClass="高度大" title="纵向撑长网络" content="高度" onClick={this.OnPertLargeVerRatio} />
                <NumericInput style={{ width: 50, height: 28, padding: 2 }} value={this.state.ver_height} onChange={(v) => { this.setState({ ver_height: v }); }} onBlur={this.OnSetVerHeight} />
                <this.IconBtn iconClass="高度小" title="纵向压缩网络" content=" " onClick={this.OnPertSmallVerRatio} />
                <Divider type="vertical" />
                <this.IconBtn iconClass="日历" title="日历设置" content="日历设置" onClick={this.AddMilestone} />
                <this.IconBtn iconClass="智能调图" title="智能调图" content="智能调图" onClick={this.IntelligentLayout} />
                <SetupPage value={this.state.setup_data} onChange={this.onSetUpDataChange} onOk={this.onSetupOk}></SetupPage>
            </div>
        )
    }
}

class ZPertMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    menu_item_style = {
        // lineHeight: "32px"
    };
    menu_item_icon_style = { fontSize: '24px', top: '4px', position: 'relative', }
    menu_item_non_icon_style = { marginLeft: 32, }

    file_menu = (
        <Menu style={{ width: 150 }} onClick={handleClick}>
            <Menu.Item style={this.menu_item_style} icon={<FileAddTwoTone />} key="menu_newfile">新建</Menu.Item>
            <Menu.Item style={this.menu_item_style} icon={<FolderOpenTwoTone />} key="menu_openfile"><span>打开</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} icon={<SaveTwoTone />} key="menu_save"><span>保存</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_saveas"><span style={this.menu_item_non_icon_style}>另存为</span></Menu.Item>
            <Menu.Divider />
            <SubMenu title={<span >导出</span>} >
                <Menu.Item key="menu_export_img">图片</Menu.Item>
                <Menu.Item key="menu_export_pdf">PDF</Menu.Item>
            </SubMenu >
            <Menu.Item style={this.menu_item_style} icon={<PrinterTwoTone />} key="menu_print"><span>打印</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} icon={<CloseCircleTwoTone />} key="menu_close"><span>关闭文件</span></Menu.Item>
        </Menu >
    );

    eidt_menu = (
        <Menu onClick={handleClick}>
            <Menu.Item style={this.menu_item_style} key="menu_undo"><span>撤销 (Ctrl+Z)</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_redo"><span>重做 (Ctrl+Y)</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_addwork"><span>插入工作 (Ctrl+W)</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_addmilestone"><span>插入里程碑 (Ctrl+M)</span></Menu.Item>
        </Menu>
    );

    operator_menu = (
        <Menu onClick={handleClick}>
            <Menu.Item style={this.menu_item_style} key="menu_upgrade"><span>升级</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_downgrade"><span>降级</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_moveup"><span>上移</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_movedown"><span>下移</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_goout"><span>上钻</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_goin"><span>下钻</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_expand_or_collasped"><span>折叠展开</span></Menu.Item>
            <SubMenu title={<span >展开至</span>} >
                <Menu.Item key="menu_expandtoall">全部展开</Menu.Item>
                <Menu.Item key="menu_expandto1">层级1</Menu.Item>
                <Menu.Item key="menu_expandto2">层级2</Menu.Item>
                <Menu.Item key="menu_expandto3">层级3</Menu.Item>
                <Menu.Item key="menu_expandto4">层级4</Menu.Item>
                <Menu.Item key="menu_expandto5">层级5</Menu.Item>
                <Menu.Item key="menu_expandto6">层级6</Menu.Item>
                <Menu.Item key="menu_expandto7">层级7</Menu.Item>
                <Menu.Item key="menu_expandto8">层级8</Menu.Item>
                <Menu.Item key="menu_expandto9">层级9</Menu.Item>
            </SubMenu >
        </Menu>
    );

    view_menu = (
        <Menu onClick={handleClick}>
            <Menu.Item style={this.menu_item_style} key="双代号网络图"><span>双代号网络图</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="横道图"><span>横道图</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_increase_hor_ratio"><span>横向撑长</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_decrease_hor_ratio"><span>横向压缩</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_increase_ver_height"><span>纵向撑长</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_decrease_ver_height"><span>纵向压缩</span></Menu.Item>
        </Menu>
    );

    setting_menu = (
        <Menu onClick={handleClick}>
            <Menu.Item style={this.menu_item_style} key="menu_setupgeneral"><span>常规</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_setupcalendar"><span>日历</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_intelligentlayout"><span>智能调图</span></Menu.Item>
        </Menu>
    );

    about_menu = (
        <Menu onClick={handleClick}>
            <Menu.Item style={this.menu_item_style} key="menu_zbra_website"><span>斑马进度官网</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_zbra_forum"><span>斑马进度论坛</span></Menu.Item>
        </Menu>
    );


    render() {
        return (
            <ConfigProvider locale={zhCN}>
                <div className="App" >
                    <Dropdown overlay={this.file_menu} placement="bottomLeft" trigger={['click']}><Button style={{ marginLeft: 8 }} type="text">文件</Button></Dropdown>
                    <Dropdown overlay={this.eidt_menu} placement="bottomLeft" trigger={['click']}><Button style={{ marginLeft: 8 }} type="text">编辑</Button></Dropdown>
                    <Dropdown overlay={this.operator_menu} placement="bottomLeft" trigger={['click']}><Button style={{ marginLeft: 8 }} type="text">大纲</Button></Dropdown>
                    <Dropdown overlay={this.view_menu} placement="bottomLeft" trigger={['click']}><Button style={{ marginLeft: 8 }} type="text">显示</Button></Dropdown>
                    <Dropdown overlay={this.setting_menu} placement="bottomLeft" trigger={['click']}><Button style={{ marginLeft: 8 }} type="text">设置</Button></Dropdown>
                    <Dropdown overlay={this.about_menu} placement="bottomLeft" trigger={['click']}><Button style={{ marginLeft: 8 }} type="text">关于</Button></Dropdown>
                    <br></br>
                    <BtnGroup pertMode="双代号网络图"></BtnGroup>
                </div >
            </ConfigProvider>);
    }
}

ReactDOM.render(
    <ZPertMenu />,
    document.getElementById("zpert_menu")
);

export default {
    view_interface
}

  // Document document;
  // document.Parse(info.c_str());
  // for (auto& v_cal : document["calendars"].GetArray()) {
  //   WorkFeedback fb;
  //   Work* work = nullptr;
  //   for (auto w : works()) {
  //     if (w->id() == 1) {
  //       work = w;
  //       break;
  //     }
  //   }
  //   if (!work)
  //     continue;
  //   //初始化反馈，父工作和里程碑直接取实际时间
  //   if (work->HasChild() || (work->is_milestone() && work->MilestoneKind() != mkNone)) {
  //     fb.real_start_time_ = work->real_start_time();
  //     fb.real_stop_time_ = work->real_stop_time();
  //     if (work->JudgeCountStatus() == kOngoing) {
  //       fb.predict_stop_time_ = work->estimate_stop_time_;
  //     }
  //     fb.status_ = work->JudgeCountStatus();
  //     fb.completion_ratio_ = work->completion_ratio_;
  //   } else
  //     fb = work->GetFeedback(count_time_);

  //   if (work_->pert_->plan_state_ == ps_count) {
  //     if (current_feedback_.status_ != kUnstarted && !IsRealStartTimeLegal(work_, current_feedback_)) {
  //       throw new CUserException();
  //     }
  //     if (current_feedback_.status_ == kFinished && !IsRealStopTimeLegal(work_, current_feedback_)) {
  //       throw new CUserException();
  //     }

  //     if (current_feedback_.status_ == kOngoing && !IsPredictStopTimeLegal(work_, current_feedback_)) {
  //       throw new CUserException();
  //     }
  //   }
  // }
  // KeyPath();


// model_3rd = "brotli/dec/decode.c \
//     brotli/dec/bit_reader.c \
//     brotli/dec/huffman.c \
//     brotli/dec/state.c \
//     brotli/enc/utf8_util.c \
//     brotli/enc/static_dict.c \
//     brotli/enc/metablock.c \
//     brotli/enc/memory.c \
//     brotli/enc/literal_cost.c \
//     brotli/enc/histogram.c \
//     brotli/enc/entropy_encode.c \
//     brotli/enc/encoder_dict.c \
//     brotli/enc/encode.c \
//     brotli/enc/dictionary_hash.c \
//     brotli/enc/compress_fragment_two_pass.c \
//     brotli/enc/compress_fragment.c \
//     brotli/enc/cluster.c \
//     brotli/enc/brotli_bit_stream.c \
//     brotli/enc/block_splitter.c \
//     brotli/enc/bit_cost.c \
//     brotli/enc/backward_references_hq.c \
//     brotli/enc/backward_references.c \
//     brotli/common/dictionary.c \
//     brotli/common/transform.c \
//     p/any.cc \
//     p/any.pb.cc \
//     p/any_lite.cc \
//     p/api.pb.cc \
//     p/arena.cc \
//     p/descriptor.cc \
//     p/descriptor.pb.cc \
//     p/descriptor_database.cc \
//     p/duration.pb.cc \
//     p/dynamic_message.cc \
//     p/empty.pb.cc \
//     p/extension_set.cc \
//     p/extension_set_heavy.cc \
//     p/field_mask.pb.cc \
//     p/generated_enum_util.cc \
//     p/generated_message_reflection.cc \
//     p/generated_message_table_driven.cc \
//     p/generated_message_table_driven_lite.cc \
//     p/generated_message_util.cc \
//     p/implicit_weak_message.cc \
//     p/map_field.cc \
//     p/message.cc \
//     p/message_lite.cc \
//     p/parse_context.cc \
//     p/reflection_ops.cc \
//     p/repeated_field.cc \
//     p/service.cc \
//     p/source_context.pb.cc \
//     p/struct.pb.cc \
//     p/text_format.cc \
//     p/timestamp.pb.cc \
//     p/type.pb.cc \
//     p/unknown_field_set.cc \
//     p/wire_format.cc \
//     p/wire_format_lite.cc \
//     p/wrappers.pb.cc \
//     p/io/coded_stream.cc \
//     p/io/gzip_stream.cc \
//     p/io/io_win32.cc \
//     p/io/printer.cc \
//     p/io/strtod.cc \
//     p/io/tokenizer.cc \
//     p/io/zero_copy_stream.cc \
//     p/io/zero_copy_stream_impl.cc \
//     p/io/zero_copy_stream_impl_lite.cc \
//     p/stubs/bytestream.cc \
//     p/stubs/common.cc \
//     p/stubs/int128.cc \
//     p/stubs/status.cc \
//     p/stubs/statusor.cc \
//     p/stubs/stringpiece.cc \
//     p/stubs/stringprintf.cc \
//     p/stubs/structurally_valid.cc \
//     p/stubs/strutil.cc \
//     p/stubs/substitute.cc \
//     p/stubs/time.cc \
//     p/util/delimited_message_util.cc \
//     p/util/field_comparator.cc \
//     p/util/field_mask_util.cc \
//     p/util/json_util.cc \
//     p/util/message_differencer.cc \
//     p/util/time_util.cc \
//     p/util/type_resolver_util.cc \
//     p/util/internal/datapiece.cc \
//     p/util/internal/default_value_objectwriter.cc \
//     p/util/internal/error_listener.cc \
//     p/util/internal/field_mask_utility.cc \
//     p/util/internal/json_escaping.cc \
//     p/util/internal/json_objectwriter.cc \
//     p/util/internal/json_stream_parser.cc \
//     p/util/internal/object_writer.cc \
//     p/util/internal/proto_writer.cc \
//     p/util/internal/protostream_objectsource.cc \
//     p/util/internal/protostream_objectwriter.cc \
//     p/util/internal/type_info.cc \
//     p/util/internal/utility.cc \
//     utils/protobuf/zpbdata.pb.cc \
//     "
