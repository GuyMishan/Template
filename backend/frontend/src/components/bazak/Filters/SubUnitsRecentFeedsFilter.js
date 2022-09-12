import React, { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from "react-table";
import { withRouter, Redirect, Link } from "react-router-dom";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Container,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Alert,
    Spinner,
    Label,
    Col,
    Collapse
} from "reactstrap";
import axios from 'axios'
import Select from 'components/general/Select/AnimatedSelect'
import MultiSelect from 'components/general/Select/AnimatedMultiSelect'

const SubUnitsRecentFeedsFilter = (props) => {
    const [sadirs, setSadirs] = useState([])

    const [takins, setTakins] = useState([])
    //units
    const [gdods, setGdods] = useState([]);
    const [hativas, setHativas] = useState([]);
    const [ogdas, setOgdas] = useState([]);
    const [pikods, setPikods] = useState([]);
    //cartypes
    const [makats, setMakats] = useState([]);
    const [mkabazs, setMkabazs] = useState([]);
    const [magads, setMagads] = useState([]);
    const [magadals, setMagadals] = useState([]);
    //
    const [collapseOpen, setcollapseOpen] = React.useState(false);
    const toggleCollapse = () => {
        setcollapseOpen(!collapseOpen);
    };

    const getTakins = async () => {
        let temptakins = [];
        temptakins.push('תקין');
        temptakins.push('לא תקין');
        setTakins(temptakins)
    }

    const getSadirs = async () => {
        let tempsadirs = [];
        tempsadirs.push('סדיר');
        tempsadirs.push('לא סדיר');
        setSadirs(tempsadirs)
    }

    const loadPikods = async () => {
        await axios.get("http://localhost:8000/api/pikod",)
            .then(response => {
                setPikods(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const loadOgdas = async (pikodids) => {
        let temppikodids = pikodids;
        if (temppikodids != undefined && !temppikodids.isArray) {
            temppikodids = [pikodids]
        }
        let temppikodsogdas = [];
        if (temppikodids != undefined && temppikodids.length > 0) {
            for (let i = 0; i < temppikodids.length; i++) {
                await axios.post("http://localhost:8000/api/ogda/ogdasbypikodid", { pikod: temppikodids[i] })
                    .then(response => {
                        for (let j = 0; j < response.data.length; j++)
                            temppikodsogdas.push(response.data[j])
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }
        setOgdas(temppikodsogdas);
    }

    const loadHativas = async (ogdaids) => {
        let tempogdaids = ogdaids;
        if (tempogdaids != undefined && !tempogdaids.isArray) {
            tempogdaids = [ogdaids]
        }
        let tempogdashativas = [];
        if (tempogdaids != undefined && tempogdaids.length > 0) {
            for (let i = 0; i < tempogdaids.length; i++) {
                await axios.post("http://localhost:8000/api/hativa/hativasbyogdaid", { ogda: tempogdaids[i] })
                    .then(response => {
                        for (let j = 0; j < response.data.length; j++)
                            tempogdashativas.push(response.data[j])
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }
        setHativas(tempogdashativas);
    }

    const loadGdods = async (hativaids) => {
        let temphativaids = hativaids;
        if (temphativaids != undefined && !temphativaids.isArray) {
            temphativaids = [hativaids]
        }
        let temphativasgdods = [];
        if (temphativaids != undefined && temphativaids.length > 0) {
            for (let i = 0; i < temphativaids.length; i++) {
                await axios.post("http://localhost:8000/api/gdod/gdodsbyhativaid", { hativa: temphativaids[i] })
                    .then(response => {
                        for (let j = 0; j < response.data.length; j++)
                            temphativasgdods.push(response.data[j])
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }
        setGdods(temphativasgdods);
    }

    function init() {
        getTakins();
        getSadirs();
        // loadPikods();
        switch (props.unittype) {
            case 'admin':
                loadPikods();
                break;
            case 'pikod':
                loadOgdas(props.unitid);
                break;
            case 'ogda':
                loadHativas(props.unitid);
                break;
            case 'hativa':
                loadGdods(props.unitid);
                break;
            case 'gdod':
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setOgdas([]);
        loadOgdas(props.filter.pikod);
    }, [props.filter.pikod]);

    useEffect(() => {
        setHativas([]);
        loadHativas(props.filter.ogda);
    }, [props.filter.ogda]);

    useEffect(() => {
        setGdods([]);
        loadGdods(props.filter.hativa);
    }, [props.filter.hativa]);

    useEffect(() => {
        init();
    }, []);

    return (
        <div style={{ width: '100%', margin: 'auto', textAlign: 'right' }}>
            <Button onClick={toggleCollapse} style={{}}>סינון</Button>
            <Collapse isOpen={collapseOpen}>
                <Card style={{ background: 'rgb(228,228,228,0.2)' }}>
                    <Row style={{ margin: '0px' }}>
                        <Col xs={12} md={2} style={{ textAlign: 'right' }}>
                            <h4 style={{ fontWeight: 'bold' }}>סדיר/לא סדיר</h4>
                            {sadirs ? sadirs.map((sadir, index) => {
                                {
                                    return (
                                        <Row>
                                            {props.filter.sadirfilter && props.filter.sadirfilter.indexOf(sadir) != -1 ?
                                                <button className="btn-empty" name={'sadir'} value={sadir} onClick={props.setfilterfunction}><h6 style={{ color: 'blue' }}>{sadir}</h6></button>
                                                : <button className="btn-empty" name={'sadir'} value={sadir} onClick={props.setfilterfunction}><h6 style={{ fontWeight: 'unset' }}>{sadir}</h6></button>}
                                        </Row>
                                    )
                                }
                            }) : null}
                        </Col>
                        <Col xs={12} md={2} style={{ textAlign: 'right' }}>
                            <h4 style={{ fontWeight: 'bold' }}>תקין/לא תקין</h4>
                            {takins ? takins.map((takin, index) => {
                                {
                                    return (
                                        <Row>
                                            {props.filter.takinfilter && props.filter.takinfilter.indexOf(takin) != -1 ?
                                                <button className="btn-empty" name={'takin'} value={takin} onClick={props.setfilterfunction}><h6 style={{ color: 'blue', }}>{takin}</h6></button>
                                                : <button className="btn-empty" name={'takin'} value={takin} onClick={props.setfilterfunction}><h6 style={{ fontWeight: 'unset' }}>{takin}</h6></button>}
                                        </Row>
                                    )
                                }
                            }) : null}
                        </Col>
                        <Col xs={12} md={8} style={{ textAlign: 'right' }}>
                            <Row style={{ paddingTop: '10px', marginBottom: '15px' }}>
                                {((props.unittype == "admin")) ?
                                    <>
                                        {(!(props.filter.ogda) || !(props.filter.ogda.length > 0)) ?
                                            <Col style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                                                <h6>פיקוד</h6>
                                                <MultiSelect data={pikods} handleChange2={props.handleChange8} name={'pikod'} />
                                            </Col> :
                                            <Col style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                                                <h6>פיקוד</h6>
                                                <MultiSelect data={pikods} handleChange2={props.handleChange8} name={'pikod'} isDisabled={true} />
                                            </Col>}
                                    </> : null}

                                {((props.unittype == "admin") || (props.unittype == "pikod")) ?
                                    <>
                                        {((props.filter.pikod) && (props.filter.pikod.length > 0) && (!(props.filter.hativa) || !(props.filter.hativa.length > 0))) ?
                                            <Col style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                                                <h6>אוגדה</h6>
                                                <MultiSelect data={ogdas} handleChange2={props.handleChange8} name={'ogda'} />
                                            </Col> :
                                            <Col style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                                                <h6>אוגדה</h6>
                                                <MultiSelect data={ogdas} handleChange2={props.handleChange8} name={'ogda'} isDisabled={true} />
                                            </Col>}
                                    </> : null}

                                {((props.unittype == "admin") || (props.unittype == "pikod") || (props.unittype == "ogda")) ?
                                    <>
                                        {((props.filter.ogda) && (props.filter.ogda.length > 0) && (!(props.filter.gdod) || !(props.filter.gdod.length > 0))) ?
                                            <Col style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                                                <h6>חטיבה</h6>
                                                <MultiSelect data={hativas} handleChange2={props.handleChange8} name={'hativa'} />
                                            </Col> :
                                            <Col style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                                                <h6>חטיבה</h6>
                                                <MultiSelect data={hativas} handleChange2={props.handleChange8} name={'hativa'} isDisabled={true} />
                                            </Col>}
                                    </> : null}

                                {((props.unittype == "admin") || (props.unittype == "pikod") || (props.unittype == "ogda") || (props.unittype == "hativa")) ?
                                    <>
                                        {((props.filter.hativa) && (props.filter.hativa.length > 0)) ?
                                            <Col style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                                                <h6>גדוד</h6>
                                                <MultiSelect data={gdods} handleChange2={props.handleChange8} name={'gdod'} />
                                            </Col> :
                                            <Col style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                                                <h6>גדוד</h6>
                                                <MultiSelect data={gdods} handleChange2={props.handleChange8} name={'gdod'} isDisabled={true} />
                                            </Col>}
                                    </> : null}
                            </Row>
                        </Col>
                    </Row>
                </Card >
            </Collapse>
        </div>
    );
}
export default withRouter(SubUnitsRecentFeedsFilter);;