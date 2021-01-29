
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

const { jsPDF } = require("jspdf");
const path = require('path')
const fs = require('fs');
const os = require('os');
console.log('os.arch:', os.arch());
console.log('os.platform:', os.platform());

import { Tabs } from "antd";
const { TabPane } = Tabs;


const view_interface = require('./view').default.exports;
console.log(view_interface);
require('./mousetrap.min')
require('./simsun-normal')


import { Menu, Dropdown, Divider, Tooltip, Input, InputNumber, Checkbox, ConfigProvider, Form, Row, Col, Table } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
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
import { pseudoRandomBytes, publicDecrypt } from "crypto";

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

// const info = (mes, type) => {
//     message.info(mes);
// };


{/* <Menu.Item style={{ marginLeft: 28, textAlign: "center", fontSize: '32px' }}><FileAddTwoTone style={{}} />新建</Menu.Item> */ }
{/* <Menu.Item style={menu_item_style} icon={<FileAddTwoTone />}><FileAddTwoTone style={menu_item_icon_style} />新建</Menu.Item> */ }
{/* <SubMenu title={<span style={{ lineHeight: "32px" }}>导出</span>} style={{ height: 100, lineHeight: "32px" }}></SubMenu> */ }
function ZMenuItem(props) { return (<Menu.Item style={{ lineHeight: "32px" }}></Menu.Item>); };


var { remote, shell, ipcRenderer } = require('electron');

// ipcRenderer.on('workdir', function (event, arg) {
//     // console.log('workdir', arg);
// })

function openUrl(url) {
    shell.openExternal(url).then(function () { }, function (reaseon) {
        shell.openPath(url).then(function () { }, function (reason) {
            // console.log(reason);
        });
    });
}

window.open = openUrl;

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
        const { value, disabled } = this.props;
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
                    disabled={disabled == undefined ? false : disabled}
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
            // console.log('Save failed:', errInfo);
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
        var newdate = e.format(format);
        setDate(newdate);
        triggerChange(newdate);
    }
    return (
        <DatePicker format={format} value={moment(value || date, format)} bordered={bordered} style={style} onChange={onDateChange} allowClear={false}></DatePicker>
    );
}

// import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
// import { MenuOutlined } from '@ant-design/icons';
// import arrayMove from 'array-move';
// const DragHandle = sortableHandle(() => (
//     <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
// ));

function CalendarSetup({ value = {}, onChange }) {
    var i = 0;
    for (var v in value.calendars) {
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

    // console.log('calendars', value);
    const [defaultid, setDefaultid] = useState(value.defaultid || 0);
    const [calendars, setCalendars] = useState(value.calendars || []);
    const [showcalendar, setShowCalendar] = useState(calendars.filter(function (k) { return k.id == defaultid; })[0] || {});

    const [newid, setNewid] = useState(-1);

    const triggerChange = (changedValue) => {
        if (onChange) {
            onChange({
                defaultid, calendars, ...value, ...changedValue,
            });
        }
    };
    const onUpdateCalendar = () => {
        const newData = [...showcalendar.vacation_rules];
        setDataSource(newData);
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
            start: moment.utc(moment().format('YYYY-MM-DD')).unix(),
            stop: moment.utc(moment().format('YYYY-MM-DD')).unix(),
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

    const GetWorkHour = e => {
        var work_minutes_per_day = 0;
        for (var k in showcalendar.work_periods)
            work_minutes_per_day += (showcalendar.work_periods[k][1] - showcalendar.work_periods[k][0]);
        return work_minutes_per_day * 1.0 / 3600;
    }

    const addWorkPeriod = e => {
        if (showcalendar.work_periods.length >= 4)
            return;
        var work_period = [0, 0];
        work_period.key = showcalendar.work_periods.length;
        showcalendar.work_periods.push(work_period);
        onUpdateCalendarPeriods();
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
                width: 65,
                render: (text, record, index) => {
                    const onChange = (e) => {
                        record.is_show_name = e.target.checked;
                        onUpdateCalendar();
                    };
                    return (<Checkbox onChange={onChange} style={{ paddingLeft: 22 }} defaultChecked={text}></Checkbox>);
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
                width: 80,
                render: (text, record, index) => {
                    const onCalendarTypeChange = (newid) => {
                        var old_type = record.type;
                        record.type = parseInt(newid);
                        if (old_type != record.type) {
                            if (record.type == 0) {
                                record.start = moment.utc(moment().format('YYYY-MM-DD')).unix();
                                record.stop = moment.utc(moment().format('YYYY-MM-DD')).unix();
                            } else if (record.type == 1) {
                                //周
                                record.start = 6;
                                record.stop = 0;
                            } if (record.type == 2) {
                                //月
                                record.start = 1;
                                record.stop = 1;
                            } if (record.type == 3) {
                                var current = moment.utc(moment().format('YYYY-MM-DD'));
                                record.start = (current.month() + 1) * 100 + current.date();
                                record.stop = (current.month() + 1) * 100 + current.date();
                            }
                        }
                        onUpdateCalendar();
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
                width: 110,
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
                width: 110,
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
                width: 65,
                render: (text, record, index) => {
                    var result = 1;
                    if (record.type == 0) {
                        var start = moment.unix(record.start).utc();
                        var stop = moment.unix(record.stop).utc();
                        var duration = moment.duration(stop.diff(start));
                        result = duration.asDays() + 1;
                    } else if (record.type == 1) {
                        result = (record.stop < record.start ? record.stop + 7 : record.stop) - record.start + 1;
                    } else if (record.type == 2) {
                        result = (record.stop < record.start ? record.stop + 31 : record.stop) - record.start + 1;
                    } else if (record.type == 3) {
                        if (record.stop >= record.start) {
                            var start = moment.utc(`${2018}-${parseInt(record.start / 100)}-${record.start % 100}`, 'YYYY-MM-DD');
                            var stop = moment.utc(`${2018}-${parseInt(record.stop / 100)}-${record.stop % 100}`, 'YYYY-MM-DD');
                            var duration = moment.duration(stop.diff(start));
                            result = duration.asDays() + 1;
                        } else {
                            var start = moment.utc(`${2018}-${parseInt(record.start / 100)}-${record.start % 100}`, 'YYYY-MM-DD');
                            var stop = moment.utc(`${2019}-${parseInt(record.stop / 100)}-${record.stop % 100}`, 'YYYY-MM-DD');
                            var duration = moment.duration(stop.diff(start));
                            result = duration.asDays() + 1;
                        }
                    }
                    return (<div style={{ paddingLeft: 8 }}>
                        {result}
                    </div>);
                }
            },
            {
                title: '休息',
                dataIndex: 'is_vacation',
                key: 'is_vacation',
                width: 80,
                render: (text, record, index) => {
                    const onCalendarIsvacationChange = (newid) => {
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
                width: 70,
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
                                style={{ marginLeft: 4, marginRight: 4, width: 60, backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`, borderRadius: 4, }}
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
                <Col className="ant-col-table" style={{ width: "540px" }}>
                    <section style={{ marginTop: 5, paddingTop: 14, border: "1px solid #f0f0f0" }}>
                        <div style={{ position: "absolute", top: "-14px", marginTop: 5, marginLeft: 8, lineHeight: 2, padding: "1px 4px", background: "#fff" }}>
                            休息日/阶段设置
                                        </div>
                        <div style={{ paddingBottom: 4 }}>
                            <Button type="primary" style={{ marginLeft: 8, paddingLeft: 8, paddingRight: 8 }} onClick={onNewVacation}>插入</Button>
                            {/* <Button type="primary" style={{ marginLeft: 8, paddingLeft: 8, paddingRight: 8 }} onClick={onNewVacation}>删除</Button> */}
                            {/* <Button type="primary" style={{ marginLeft: 8, paddingLeft: 8, paddingRight: 8 }} onClick={onNewVacation}>上移</Button> */}
                            {/* <Button type="primary" style={{ marginLeft: 8, paddingLeft: 8, paddingRight: 8 }} onClick={onNewVacation}>下移</Button> */}
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
                <Col flex="140px" >
                    <section style={{ marginTop: 5, paddingTop: 14, border: "1px solid #f0f0f0" }}>
                        <div style={{ position: "absolute", top: "-14px", marginTop: 5, marginLeft: 8, lineHeight: 2, padding: "1px 4px", background: "#fff" }}>
                            工作时间设置
                                        </div>
                        <div style={{ paddingBottom: 4 }}>
                            <Input value={GetWorkHour()} style={{ width: 50, marginLeft: 8, paddingLeft: 8, paddingRight: 8 }} ></Input>
                            <span style={{ paddingLeft: 2 }}>小时</span>
                            <Button
                                style={{ marginLeft: 8 }}
                                type="dashed"
                                shape="circle"
                                onClick={() => addWorkPeriod()}
                                icon={<PlusOutlined />}
                            >
                            </Button>
                        </div>
                        <div style={{ height: 200 }}>
                            <Table
                                dataSource={perioddataSource}
                                columns={[
                                    {
                                        title: '开始',
                                        dataIndex: 'start',
                                        key: 'start',
                                        render: (text, record, index) => {
                                            const onCalendarWorkPerStartChange = e => {
                                                var s = e[0].format('HH:mm')
                                                record[0] = (parseInt(s.slice(0, 2)) * 60 + parseInt(s.slice(3, 5))) * 60;
                                                s = e[1].format('HH:mm')
                                                record[1] = (parseInt(s.slice(0, 2)) * 60 + parseInt(s.slice(3, 5))) * 60;
                                                onUpdateCalendarPeriods();
                                            }
                                            return ({
                                                children: <RangePicker
                                                    className="table_time_range_picker"
                                                    allowClear={false}
                                                    value={[moment(`${record[0] / 60 / 60}:${record[0] / 60 % 60}`, 'HH:mm'), moment(`${record[1] / 60 / 60}:${record[1] / 60 % 60}`, 'HH:mm')]}
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

function GeneralSetUp({ value = {}, onChange, tabindex = "1" }) {
    const [askstarttime, setAskStartTime] = useState(moment.unix(value.ask_start_time).utc().format('YYYY-MM-DD HH:mm'));
    const [askstoptime, setAskStopTime] = useState(moment.unix(value.ask_stop_time).utc().format('YYYY-MM-DD HH:mm'));
    const [askduration, setAskDuration] = useState({ number: value.askduration || 1, currency: value.durationunit || 0 });

    const [form] = Form.useForm();

    const DurationInput = ({ value = {}, onChange }) => {
        const [number, setNumber] = useState(1);
        const [currency, setCurrency] = useState(0);

        const triggerChange = (changedValue) => {
            if (onChange) {
                onChange({
                    number, currency, ...value, ...changedValue,
                });
            }
        };
        const onNumberChange = (e) => {
            // console.log('numberchange:', e);
            var newNumber = e;
            if (newNumber == '-' || newNumber == null || newNumber == '')
                newNumber = 0;
            if (!('number' in value)) {
                setNumber(newNumber);
            }
            triggerChange({
                number: newNumber,
            });
        }
        const onCurrencyChange = (newCurrency) => {
            if (!('currency' in value)) {
                setCurrency(newCurrency);
            }

            triggerChange({
                currency: newCurrency,
            });
        };
        return (
            <span>
                <InputNumber
                    value={value.number == undefined ? number : value.number}
                    onChange={onNumberChange}
                    style={{ width: 60, }}
                />
                <Select
                    value={value.currency == undefined ? currency : value.currency}
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
    const onValuesChange = newvalue => {
        // console.log('onvaluechange', newvalue);
        if (newvalue.ask_start_time != undefined) {
            var start_time = moment.utc(newvalue.ask_start_time).unix();
            var stop_time = moment.utc(askstoptime).unix();
            var duration = askduration.number * (askduration.currency === 0 ? 24 * 60 * 60 : (askduration.currency === 1 ? 60 * 60 : 60));

            stop_time = start_time + duration;
            var show_stop = moment.unix(stop_time).utc().format('YYYY-MM-DD HH:mm');
            newvalue.ask_stop_time = show_stop;

        } else if (newvalue.ask_stop_time != undefined) {
            var start_time = moment.utc(askstarttime).unix();
            var stop_time = moment.utc(newvalue.ask_stop_time).unix();
            var duration = askduration.number * (askduration.currency === 0 ? 24 * 60 * 60 : (askduration.currency === 1 ? 60 * 60 : 60));

            var num = (stop_time - start_time) / (askduration.currency === 0 ? 24 * 60 * 60 : (askduration.currency === 1 ? 60 * 60 : 60));
            newvalue.askduration = { number: num, currency: askduration.currency }
        } else if (newvalue.askduration != undefined) {
            var start_time = moment.utc(askstarttime).unix();
            var stop_time = moment.utc(askstoptime).unix();
            var duration = newvalue.askduration.number * (newvalue.askduration.currency === 0 ? 24 * 60 * 60 : (newvalue.askduration.currency === 1 ? 60 * 60 : 60));

            stop_time = start_time + duration;
            var show_stop = moment.unix(stop_time).utc().format('YYYY-MM-DD HH:mm');
            newvalue.ask_stop_time = show_stop;
        }

        if (onChange) {
            if (newvalue.ask_start_time != undefined) {
                setAskStartTime(newvalue.ask_start_time);
                form.setFieldsValue({ ask_start_time: newvalue.ask_start_time });
                newvalue.ask_start_time = moment.utc(newvalue.ask_start_time).unix();
            }
            if (newvalue.ask_stop_time != undefined) {
                setAskStopTime(newvalue.ask_stop_time);
                form.setFieldsValue({ ask_stop_time: newvalue.ask_stop_time });
                newvalue.ask_stop_time = moment.utc(newvalue.ask_stop_time).unix();
            }
            if (newvalue.askduration != undefined) {
                setAskDuration(newvalue.askduration);
                form.setFieldsValue({ askduration: newvalue.askduration });
                newvalue.durationunit = newvalue.askduration.currency;
                newvalue.askduration = newvalue.askduration.number;
            }
            onChange(newvalue);
        }
    }
    return (
        <>
            <Tabs defaultActiveKey={tabindex} type="card" size='small'>
                <TabPane tab="常规" key="1">
                    <Form
                        layout="vertical"
                        name="basic"
                        initialValues={{
                            planname: value.planname || '',
                            tag: value.tag || '',
                            describe: value.describe || '',
                        }}
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
                        form={form}
                        layout="inline"
                        name="basic"
                        initialValues={{
                            ask_start_time: moment.unix(value.ask_start_time).utc().format('YYYY-MM-DD HH:mm'),
                            ask_stop_time: moment.unix(value.ask_stop_time).utc().format('YYYY-MM-DD HH:mm'),
                            schedule: value.schedule || 0,
                            askduration: { number: value.askduration, currency: value.durationunit || 0 },
                        }}
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

const SetupPage = ({ value = {}, onChange, onOk, tabindex = 1 }) => {
    const [isvisible, setVisible] = useState(false);

    const setupOk = e => {
        setVisible(false);
        if (onOk) {
            onOk(e);
        }
    };
    const setupCancel = e => {
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
                width={720}
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
                <GeneralSetUp value={value} onChange={onDataChange} tabindex={tabindex}></GeneralSetUp>
            </Modal>
        </>
    );
}

function showsetup(value, index, onDataChange) {
    Modal.confirm({
        className: "ant-modal-setup-confirm",
        width: 720,
        okText: "确定",
        cancelText: "取消",
        centered: true,
        mask: false,
        maskClosable: false,
        closable: true,
        content: <GeneralSetUp value={value} onChange={onDataChange} tabindex={index}></GeneralSetUp>,
    }
    );
}

var font = '';
ipcRenderer.invoke('getapppath').then((result) => {
    var fontpath = path.join(result, 'src/resource/simsun.ttf');

    fs.readFile(fontpath, 'base64', (err, data) => {
        if (err) {
            // console.log(data, '打开失败');
        } else {
            // console.log(data, data.toString(), typeof (data));
            font = data.toString();
            window.font = font;
        }
    })
})


class ZPertMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            pertMode: '双代号网络图',
            cur_view: '计划编制',
            menu: props.menu,
            style: props.style,
            collapsed: "展开",
            is_show_btn_text: true,
            ver_height: '',
            hor_ratio: '',
            setup_data: {},
            update_data: {},
            setup_callback: undefined,
            setup_index: '1',
            view_set: ['计划编制'],
            clipboard: '',
        };
    }

    onFileOpen = () => {
        // console.log(view_interface);
        this.setState({
            disabled: false,
        });
        this.setState({
            view_set: JSON.parse(view_interface.getView().GetViews()),
        });
        view_interface.getView().OnFileOpen();
    }
    onFileClose = () => {
        this.setState({
            view_set: JSON.parse(view_interface.getView().GetViews()),
            disabled: true
        });
        view_interface.onClose();
    }
    ratio = undefined
    px2cm = (px) => {
        if (this.ratio == undefined) {
            var ratio = 0;
            var div = document.createElement('div');
            div.style.width = '1cm';
            div.id = 'puc';
            document.body.appendChild(div);
            var w = getComputedStyle(div, null).width;
            ratio = w.substr(0, w.length - 2);
            // console.log(ratio);
            div.parentNode.removeChild(div);
            this.ratio = ratio;
        }
        return px / this.ratio;
    }

    writetoclipboard = (str) => {
        // console.log(str);
        if (str != undefined) {
            ipcRenderer.send("writeclipboard", str);
        } else {
            ipcRenderer.send("writeclipboard", '');
        }
    }

    handleClick = (e) => {
        switch (e.key) {
            case 'menu_newfile':
                view_interface.newFile();
                this.onFileOpen();
                break;
            case 'menu_openfile':
                const onfileopen = this.onFileOpen;
                (function xml_openSelectionBox() {
                    var inputObj = document.getElementById('my_inputObj');
                    if (!inputObj) {
                        inputObj = document.createElement('input')
                        inputObj.setAttribute('id', 'my_inputObj');
                        inputObj.setAttribute('type', 'file');
                        inputObj.setAttribute("style", 'visibility:hidden');
                        inputObj.setAttribute('accept', '.zpet');
                        document.body.appendChild(inputObj);
                    }

                    function xml_parse(e) {
                        const file = e.target.files[0];
                        if (!file) {
                            document.body.removeChild(inputObj);
                            return;
                        }

                        //7z.exe x b.zpet -p加密锁验证失败，程序将退出! -otemp

                        var open_path = file.path;
                        if (os.platform() === 'win32') {
                            // ipcRenderer.send("openfile");
                            ipcRenderer.invoke('getapppath').then((result) => {
                                var cmd = path.join(result, '7z/7z.exe');
                                var outdir = path.join(result, 'temp');
                                if (fs.existsSync(outdir)) {
                                    fs.rmdirSync(outdir, { recursive: true });
                                }
                                require('child_process').spawnSync(cmd, ['x', open_path, '-p加密锁验证失败，程序将退出!', '-o' + outdir]);
                                open_path = outdir;
                                // open_path = path.join(outdir, '0000')
                                // if (!fs.existsSync(open_path)) {
                                //     open_path = path.join(outdir, 'zpet')
                                // }
                                view_interface.openFile(open_path).then(function () {
                                    onfileopen();
                                });
                            })
                        } else {
                            view_interface.openFile(open_path).then(function () {
                                onfileopen();
                            });
                        }

                        document.body.removeChild(inputObj);
                    }
                    function delete_obj() {
                        document.body.removeChild(inputObj);
                    }

                    inputObj.onchange = xml_parse;//选中文件时触发的方法
                    inputObj.oncancel = delete_obj;
                    inputObj.click();
                })();
                break;
            case 'menu_save':
                // ipcRenderer.send("savefileas");
                break;
            case 'menu_saveas':
                ipcRenderer.invoke('savefileas').then((result) => {
                    fs.writeFile(result, view_interface.getView().ToJson(), {}, function (err) {
                        if (err)
                            throw err;
                        // console.log('保存成功');
                    })
                })
                break;
            case 'menu_export_img':
                var canvas = document.createElement('canvas');
                var size = view_interface.getView().GetDrawSize();
                canvas.width = size[0] + 79 * 2;
                canvas.height = size[1] + 76 * 2;

                var ctx = canvas.getContext('2d');
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                view_interface.print(ctx);

                var data = canvas.toDataURL("image/jpg");
                var arr = data.split(',');

                ipcRenderer.invoke('savefileas', { name: '图片jpg', extensions: ['jpg'] }).then((result) => {
                    fs.writeFile(result, arr[1], 'base64', function (err) {
                        if (err)
                            throw err;
                        // console.log('保存成功');
                    })
                })
                break;
            case 'menu_export_pdf':
                var size = view_interface.getView().GetDrawSize();
                var type = (size[0] + 79 * 2) > (size[1] + 76 * 2) ? 'l' : 'p';
                const doc = new jsPDF(type, 'mm', [size[0] + 79 * 2, size[1] + 76 * 2]);
                // console.log('pdfsize:', size[0] + 79 * 2, size[1] + 76 * 2);
                // doc.setPage(1);
                // doc.addFileToVFS('simsun-normal.ttf', window.font);
                // console.log('1');
                // doc.addFont("simsun-normal.ttf", "simsun", "normal");
                // console.log('2');
                // doc.setFont("simsun");
                // doc.addFont(fontpath, 'simsun', 'normal');
                // doc.setFont('simsun');


                var ctx = doc.context2d;
                Object.defineProperty(ctx, "setLineDash", {
                    value: function (t) {
                        ctx.pdf.setLineDash(t);
                    }
                })
                Object.defineProperty(ctx, "measureText", {
                    value: function (t) {
                        if ("string" != typeof t) throw n.error("jsPDF.context2d.measureText: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.measureText");
                        var e = ctx.pdf,
                            r = ctx.pdf.internal.scaleFactor,
                            i = e.internal.getFontSize(),
                            a = e.getStringUnitWidth(t) * i / e.internal.scaleFactor,
                            o = function (t) {
                                var e = (t = t || {}).width || 0;
                                return Object.defineProperty(this, "width", {
                                    get: function () {
                                        return e
                                    }
                                }), this
                            };
                        return new o({
                            width: a
                        })
                    }
                })


                view_interface.print(ctx);

                window.pdf = doc;
                window.ctx = ctx;

                doc.save("a4.pdf");

                break;
            case 'menu_export_excel':
                const xlsx = require('better-xlsx');
                const file = new xlsx.File();
                const sheet = file.addSheet('Sheet1');

                var json = JSON.parse(view_interface.getView().ToExcel());
                var colwidth = json['colwidth'];
                var rowheight = json['rowheight'];

                for (var i = 0; i < rowheight.length; i++) {
                    const row = sheet.addRow();
                    var h = this.px2cm(rowheight[i] * 4 / 3);
                    row.setHeightCM(h);
                    for (var j = 0; j < colwidth.length; j++) {
                        var celldata = json['grids'][i][j];
                        const cell = row.addCell();
                        cell.value = celldata['showstring']
                        cell.style.align.v = 'center';
                        cell.style.font.color = '' + celldata['fontcolor'].toString(16);
                        if (celldata.vmerge != undefined) {
                            cell.vMerge = celldata.vmerge;
                            cell.hMerge = celldata.hmerge;
                        }
                    }
                }
                for (var i = 0; i < colwidth.length; i++) {
                    sheet.col(i).width = colwidth[i] * 3 / 4;
                }

                const JSZip = require("jszip");
                var zip = new JSZip();
                var parts = file.makeParts();
                for (var _i = 0, _Object$keys = Object.keys(parts); _i < _Object$keys.length; _i++) {
                    var key = _Object$keys[_i];
                    zip.file(key, parts[key]);
                }
                var compression = 'STORE';

                zip.generateAsync({
                    type: 'nodebuffer',
                    compression
                }).then(function (data) {
                    ipcRenderer.invoke('savefileas', { name: 'Excel 工作簿', extensions: ['xlsx'] }).then((result) => {
                        fs.writeFile(result, data, {}, function (err) {
                            if (err)
                                throw err;
                            // console.log('保存成功');
                        })
                    })
                });
                break;
            case 'menu_print':
                require('./jquery.jqprint-0.3');
                require('./jquery-migrate-1.2.1.min');

                var div = document.createElement('div');

                var canvas = document.createElement('canvas');
                var size = view_interface.getView().GetDrawSize();
                canvas.width = size[0] + 79 * 2;
                canvas.height = size[1] + 76 * 2;

                var ctx = canvas.getContext('2d');
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                view_interface.print(ctx);

                var image = document.createElement('img')
                div.id = 'zpert_print_canvas';
                image.src = canvas.toDataURL("image/png")
                div.appendChild(image);
                document.body.appendChild(div);

                // var old_body = window.document.body.innerHTML;
                // window.document.body.innerHTML = canvas.innerHTML;
                // window.print();
                // window.document.body.innerHTML = old_body; 

                $("#zpert_print_canvas").jqprint();
                // console.log('printend');
                document.body.removeChild(div);
                // var data = canvas.toDataURL("image/jpg");
                // var arr = data.split(',');

                break;
            case 'menu_close':
                this.onFileClose();
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
                view_interface.getView().OnGoOut();
                break;
            case 'menu_goin':
                view_interface.getView().OnGoIn();
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
                view_interface.getView().OnSetUp(1);
                break;
            case 'menu_setupcalendar':
                view_interface.getView().OnSetUp(2);
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

    menu_item_icon_style = { fontSize: '24px', top: '4px', position: 'relative', }
    menu_item_non_icon_style = { marginLeft: 32, }

    file_menu = () => {
        return (
            <Menu style={{ width: 150 }} onClick={this.handleClick}>
                <Menu.Item style={this.menu_item_style} icon={<FileAddTwoTone />} key="menu_newfile">新建</Menu.Item>
                <Menu.Item style={this.menu_item_style} icon={<FolderOpenTwoTone />} key="menu_openfile"><span>打开</span></Menu.Item>
                <Menu.Item style={this.menu_item_style} icon={<SaveTwoTone />} key="menu_save" disabled={this.state.disabled}><span>保存</span></Menu.Item>
                <Menu.Item style={this.menu_item_style} key="menu_saveas" disabled={this.state.disabled}><span style={this.menu_item_non_icon_style}>另存为</span></Menu.Item>
                <Menu.Divider />
                <SubMenu title={<span >导出</span>} disabled={this.state.disabled}>
                    <Menu.Item key="menu_export_img">图片</Menu.Item>
                    <Menu.Item key="menu_export_pdf">PDF</Menu.Item>
                    <Menu.Item key="menu_export_excel">excel</Menu.Item>
                </SubMenu >
                <Menu.Item style={this.menu_item_style} icon={<PrinterTwoTone />} key="menu_print" disabled={this.state.disabled}><span>打印</span></Menu.Item>
                <Menu.Item style={this.menu_item_style} icon={<CloseCircleTwoTone />} key="menu_close" disabled={this.state.disabled}><span>关闭文件</span></Menu.Item>
            </Menu >
        );
    }

    eidt_menu = (
        <Menu onClick={this.handleClick}>
            <Menu.Item style={this.menu_item_style} key="menu_undo"><span>撤销 (Ctrl+Z)</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_redo"><span>重做 (Ctrl+Y)</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_addwork"><span>插入工作 (Ctrl+W)</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_addmilestone"><span>插入里程碑 (Ctrl+M)</span></Menu.Item>
        </Menu>
    );

    operator_menu = (
        <Menu onClick={this.handleClick}>
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
        <Menu onClick={this.handleClick}>
            <Menu.Item style={this.menu_item_style} key="双代号网络图"><span>双代号网络图</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="横道图"><span>横道图</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_increase_hor_ratio"><span>横向撑长</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_decrease_hor_ratio"><span>横向压缩</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_increase_ver_height"><span>纵向撑长</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_decrease_ver_height"><span>纵向压缩</span></Menu.Item>
        </Menu>
    );

    setting_menu = (
        <Menu onClick={this.handleClick}>
            <Menu.Item style={this.menu_item_style} key="menu_setupgeneral"><span>常规</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_setupcalendar"><span>日历</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_intelligentlayout"><span>智能调图</span></Menu.Item>
        </Menu>
    );

    about_menu = (
        <Menu onClick={this.handleClick}>
            <Menu.Item style={this.menu_item_style} key="menu_zbra_website"><span>斑马进度官网</span></Menu.Item>
            <Menu.Item style={this.menu_item_style} key="menu_zbra_forum"><span>斑马进度论坛</span></Menu.Item>
        </Menu>
    );

    onSetUpDataChange = e => {
        var new_update_data = { ...this.state.update_data, ...e };
        // console.log('onSetUpDataChange', e);
        this.setState({
            update_data: new_update_data
        });
        // console.log('new_update_data', new_update_data);
    }
    onSetupOk = e => {
        // console.log('ok', this.state.update_data);
        this.state.setup_callback({ result: this.state.update_data });
    }

    initView() {
        view_interface.initwasm({
            call_back: {
                updateMenu: (e) => {
                    this.updateMenu(e);
                }
            },
            writeToClipBoard: (jsonstr, datastr) => {
                this.writetoclipboard(datastr);
                this.setState({
                    clipboard: jsonstr,
                });
            },
            createSettingDialog: (data, index) => {
                // console.log('createdialog', data);
                return new Promise((resolve, reject) => {
                    this.setState({ setup_data: data });
                    this.setState({ update_data: {} });
                    this.setState({ setup_index: index + '' });
                    document.getElementById('modalbutton').click();
                    this.setState({ setup_callback: resolve });

                    // showsetup(this.state.setup_data, this.state.setup_index); //自定义model
                });
            }
        });
        const onresize = w => {
            if (w < 1350)
                this.setState({ is_show_btn_text: false });
            else
                this.setState({ is_show_btn_text: true });
        }
        view_interface.setMessageBox(info);
        window.onresize = function (e) {
            onresize(document.documentElement.clientWidth);
            view_interface.autosizeCanvas();
        }
    }

    updateMenu(info) {
        if (info.edit_width) { this.setState({ hor_ratio: info.edit_width }); }
        if (info.edit_height) { this.setState({ ver_height: info.edit_height }); }
        if (info.collapsedbutton) { this.setState({ collapsed: info.collapsedbutton }); }
        if (info.viewname) { this.setState({ cur_view: info.viewname }); }
    }

    componentDidMount() {
        this.initView();

        Mousetrap.bind('alt+shift+left', () => { this.OnUpGrade(); return false; },);
        Mousetrap.bind('alt+shift+right', () => { this.OnDownGrade(); return false; },);
        Mousetrap.bind('mod+alt+up', () => { this.OnMoveUp(); return false; },);
        Mousetrap.bind('mod+alt+down', () => { this.OnMoveDown(); return false; },);
        Mousetrap.bind('shift+alt+up', () => { this.OnGoOut(); return false; },);
        Mousetrap.bind('shift+alt+down', () => { this.OnGoIn(); return false; },);
        Mousetrap.bind('ctrl+w', () => { this.AddWork(); return false; });
        Mousetrap.bind('ctrl+m', () => { this.AddMilestone(); return false; });
        Mousetrap.bind('ctrl+z', () => { this.handleClick({ key: "menu_undo" }); return false; });
        Mousetrap.bind('ctrl+y', () => { this.handleClick({ key: "menu_redo" }); return false; });
        Mousetrap.bind('ctrl+c', () => { view_interface.onCopy(); return false; });
        Mousetrap.bind('ctrl+v', () => {
            view_interface.onPaste(this.state.clipboard);
            return false;
        });
        Mousetrap.bind('ctrl+1', () => { view_interface.getView().OnSetUp(1); return false; });
        Mousetrap.bind('del', () => { view_interface.getView().OnDelete(); return false; });
    }

    onChangePertMode = (e) => {
        this.handleClick(e);
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

    onCollapsedTo = (e) => {
        this.handleClick(e);
    }
    onCollapsed = (e) => {
        view_interface.onCollapsed();
    }

    collapse_menu = (
        <Menu onClick={this.onCollapsedTo}>
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
    onSelectView = (e) => {
        this.setState({
            cur_view: e.key
        });
        view_interface.getView().ApplyView(e.key);
    }
    HeartSvg = (props) => (
        <>
            <svg className="menu_icon" viewBox="0 0 64 64"> <use xlinkHref={`#icon-${props.iconClass}`} /> </svg>
        </>
    );

    IconBtn = (props) => {
        return (
            <Tooltip placement="bottomLeft" title={props.title} color='white' mouseEnterDelay={0.005} mouseLeaveDelay={0.005}>
                <Button
                    disabled={(props.disabled != undefined) ? props.disabled : this.state.disabled}
                    onClick={props.onClick}
                    className="antd-my-btn"
                >
                    <this.HeartSvg iconClass={props.iconClass} />
                    {this.state.is_show_btn_text ? props.content : " "}
                </Button>
                {/* <div className="antd-my-btn" style={{ display: "inline-block" }} onClick={props.onClick}>
                    <this.HeartSvg iconClass={props.iconClass} />
                    <span >{this.state.is_show_btn_text ? props.content : " "}</span>
                </div> */}
            </Tooltip>
        );
    }

    BtnIcon = (props) => {
        return (
            <Tooltip placement="bottomLeft" title={props.title} color='white' mouseEnterDelay={0.005} mouseLeaveDelay={0.005}>
                {/* <span>{props.content}</span>
                <Button style={{ padding: 4 }} type="text" icon={<this.HeartSvg iconClass={props.iconClass} />} onClick={props.onClick}>{" "}</Button> */}
                {/* <div className="antd-my-btn" style={{ display: "inline-block" }} onClick={props.onClick}>
                    <span >{this.state.is_show_btn_text ? props.content : " "}</span>
                    <this.HeartSvg iconClass={props.iconClass} />
                </div> */}
                <Button
                    disabled={(props.disabled != undefined) ? props.disabled : this.state.disabled}
                    onClick={props.onClick}
                    className="antd-my-btn"
                >
                    {this.state.is_show_btn_text ? props.content : " "}
                    <this.HeartSvg iconClass={props.iconClass} />
                </Button>
            </Tooltip>
        );
    }
    ZButton = (props) => {
        return (
            <Button
                style={props.style || {}}
                type={props.tyle || "text"}
                onClick={props.onClick}
                disabled={(props.disabled != undefined) ? props.disabled : this.state.disabled}
            >
                {props.text}
            </Button>
        );
    }

    ZDropdown = (props) => {
        return (
            <Dropdown
                overlay={props.overlay || (<Menu></Menu>)}
                placement={props.placement || "bottomLeft"}
                disabled={(props.disabled != undefined) ? props.disabled : this.state.disabled}
            >
                <Button style={props.btnstyle || { marginLeft: 8 }} type="text">
                    {props.btntext ? props.btntext : undefined}{props.drawoutline ? <DownOutlined /> : <></>}
                </Button>
            </Dropdown>
        );
    }

    OnUpGrade = () => { this.handleClick({ key: "menu_upgrade" }); }
    OnDownGrade = () => { this.handleClick({ key: "menu_downgrade" }); }
    OnGoIn = () => { this.handleClick({ key: "menu_goin" }); }
    OnGoOut = () => { this.handleClick({ key: "menu_goout" }); }
    OnMoveUp = () => { this.handleClick({ key: "menu_moveup" }); }
    OnMoveDown = () => { this.handleClick({ key: "menu_movedown" }); }
    AddWork = () => { this.handleClick({ key: "menu_addwork" }); }
    AddMilestone = () => { this.handleClick({ key: "menu_addmilestone" }); }
    OnCalendar = () => { this.handleClick({ key: "menu_setupcalendar" }); };
    IntelligentLayout = () => { this.handleClick({ key: "menu_intelligentlayout" }); }
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
    OnPertLargeHorRatio = () => { this.handleClick({ key: "menu_increase_hor_ratio" }); }
    OnPertSmallHorRatio = () => { this.handleClick({ key: "menu_decrease_hor_ratio" }); }
    OnPertLargeVerRatio = () => { this.handleClick({ key: "menu_increase_ver_height" }); }
    OnPertSmallVerRatio = () => { this.handleClick({ key: "menu_decrease_ver_height" }); }


    render() {
        return (
            <ConfigProvider locale={zhCN}>
                <div className="zpert-header-toolbar" >
                    <div className="zpert-header"  >
                        <div >
                            <this.ZDropdown overlay={this.file_menu()} btntext="文件" disabled={false} />
                            <this.ZDropdown overlay={this.eidt_menu} btntext="编辑" />
                            <this.ZDropdown overlay={this.operator_menu} btntext="大纲" />
                            <this.ZDropdown overlay={this.view_menu} btntext="显示" />
                            <this.ZDropdown overlay={this.setting_menu} btntext="设置" />
                            <this.ZDropdown overlay={this.about_menu} btntext="关于" />
                        </div>
                    </div >
                    <div className="zpert-toolbar"  >
                        <div >
                            <this.ZDropdown
                                overlay={
                                    <Menu onClick={this.onSelectView}>
                                        {this.state.view_set.map(item => (
                                            <Menu.Item key={item}>{item}</Menu.Item >
                                        ))}
                                    </Menu>}
                                btnstyle={{ marginLeft: 8, padding: 4 }}
                                btntext={this.state.cur_view}
                                drawoutline
                            />
                            <this.ZDropdown overlay={this.pert_mode_menu} btnstyle={{ marginLeft: 8, padding: 4 }} btntext={this.state.pertMode} drawoutline />
                            <Divider type="vertical" />
                            <this.ZButton style={{ padding: 4 }} type="text" onClick={this.onCollapsed} text={this.state.collapsed} />
                            <this.ZDropdown overlay={this.collapse_menu} btnstyle={{ padding: 4 }} drawoutline />

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
                            <NumericInput
                                style={{ width: 50, height: 28, padding: 2 }}
                                value={this.state.hor_ratio}
                                onChange={(v) => { this.setState({ hor_ratio: v }); }}
                                onBlur={this.OnSetHorRatio}
                                disabled={this.state.disabled}
                            />
                            <this.IconBtn iconClass="宽度小" title="横向压缩网络" content=" " onClick={this.OnPertSmallHorRatio} />
                            <this.BtnIcon iconClass="高度大" title="纵向撑长网络" content="高度" onClick={this.OnPertLargeVerRatio} />
                            <NumericInput
                                style={{ width: 50, height: 28, padding: 2 }}
                                value={this.state.ver_height}
                                onChange={(v) => { this.setState({ ver_height: v }); }}
                                onBlur={this.OnSetVerHeight}
                                disabled={this.state.disabled}
                            />
                            <this.IconBtn iconClass="高度小" title="纵向压缩网络" content=" " onClick={this.OnPertSmallVerRatio} />
                            <Divider type="vertical" />
                            <this.IconBtn iconClass="日历" title="日历设置" content="日历设置" onClick={this.OnCalendar} />
                            <this.IconBtn iconClass="智能调图" title="智能调图" content="智能调图" onClick={this.IntelligentLayout} />
                            <SetupPage value={this.state.setup_data} onChange={this.onSetUpDataChange} onOk={this.onSetupOk} tabindex={this.state.setup_index}></SetupPage>
                        </div>
                    </div>
                </div>

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
