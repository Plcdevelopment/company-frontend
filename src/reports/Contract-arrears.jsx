import React, { useState,useEffect } from "react";
import {Input,InputGroup, DatePicker,SelectPicker,Loader, Placeholder  } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import {Config} from "../config/connenct";
import axios from 'axios';
import moment from "moment";
import numeral from "numeral";
export default function ContractArrears() {
  const api = Config.urlApi;
  const [itemtype,setItimeType] = useState([]);
  const fetchType = async () => {
    try {
      const response = await fetch(api + 'redType');
      const jsonData = await response.json();
      setItimeType(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const dataType = itemtype.map(item => ({ label: item.type_in_name, value: item.type_in_code }));
  const [selectedValue, setSelectedValue] = useState('');

  const handleShowType=(e)=>{
    setSelectedValue(e)
    showOption(e)
    setTypeId(e)
}
const showOption =(event) =>{
  axios.get(api + 'redOption/'+event)
  .then(function(res){
    setItemOption(res.data);
  }).catch(err => {
      console.log(err)
  });
}

const [itemoption,setItemOption]=useState([]);
  const dataOption = itemoption.map(item => ({ label: item.options_name, value: item.options_code }));
//======================================================

      const [data, setData] = useState([]);

      const [currentPage, setcurrentPage] = useState(1);
      const [itemsPerPage, setitemsPerPage] = useState(100);
      const handleShowLimit = (value) => {
        setitemsPerPage(value);
      };
      const [pageNumberLimit, setpageNumberLimit] = useState(5);
      const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
      const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
    
      const handleClick = (event) => {
        setcurrentPage(Number(event.target.id));
        setI(indexOfLastItem+1)
      };

      const pages = [];
      for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pages.push(i);
      }
    
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    
      const [i, setI] = useState(1);
      const qtyItem =data.length;
      const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li  key={number} className={`page-item ${currentPage == number ? "active" : ''}`} >
           <span role="button"  id={number} onClick={handleClick} className="page-link border-blue">{number}</span>   
            </li>
          );
        } else {
          <li  key={number} className="page-item active" >
           <span role="button" className="page-link border-blue">1</span>   
            </li>
        }
      });

const handleSearch=()=>{
  fetchInsruanceArrears();
}
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [typeId, setTypeId] = useState('');
  const [optionId, setOptionId] = useState('');
  const [datasearch,setDataSearch]=useState('');

    const [loading,setLoading]=useState(false);
  const fetchInsruanceArrears = () => {
    setLoading(true);
    axios.post(api + 'redArrears', {
      startDate,
      endDate,
      typeId,
      optionId,datasearch
    })
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.error('Error searching data:', error);
    })
    .finally(() => {
      setLoading(false);
    });
  }
  useEffect(() => {
    fetchInsruanceArrears();
    fetchType()
  }, []);

  //===============  search ===================
  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);
    setI(indexOfLastItem-1)

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let totalInitialFee=0;
  let totalMoneyTaxes = 0;
  let totalRegistrationFee = 0;
  let totalInsurancIncluded = 0;

currentItems.forEach(item => {
    totalInitialFee += parseInt(item.initial_fee) ;
    totalMoneyTaxes += parseInt(item.money_taxes) ;
    totalRegistrationFee += parseInt(item.registration_fee);
    totalInsurancIncluded += parseInt(item.insuranc_included);
});

  return (
    <>
      <div id="content" className="app-content">
        <h1 className="page-header"> ລາຍງານຕິດຕາມໜີ້ຄ້າງຈ່າຍ</h1>
        <div className="panel panel-inverse">
          <div className="panel-heading">
            <h4 className="panel-title">ລາຍງານຍອດຄ້າງຈ່າຍ</h4>
            <div className="panel-heading-btn">
              <a href="javascript:;" className="btn btn-xs btn-icon btn-default" data-toggle="panel-expand" >
                <i className="fa fa-expand"></i>
              </a>
              <a href="javascript:;" className="btn btn-xs btn-icon btn-warning" data-toggle="panel-collapse" >
                <i className="fa fa-minus"></i>
              </a>
              <a href="javascript:;" className="btn btn-xs btn-icon btn-danger"  data-toggle="panel-remove"  >
                <i className="fa fa-times"></i>
              </a>
            </div>
          </div>
          <div className="panel-body">
            <div className="row fs-14px mb-3">
                <div className="col-sm-6 col-lg-4">
                    <div className="row ">
                    <div className="col-6">
                        <label htmlFor="" className="form-label">ວັນທີ</label>
                        <DatePicker oneTap value={startDate}  format="dd/MM/yyyy" onChange={value => setStartDate(value)} block placeholder='ວັນທີ' />
                    </div>
                    <div className="col-6">
                    <label htmlFor="" className="form-label">ຫາວັນທີ</label>
                    <DatePicker oneTap value={endDate}  format="dd/MM/yyyy" onChange={value => setEndDate(value)} block placeholder='ວັນທີ' />
                    </div>
                    </div>
                </div>
                <div className="col-sm-4 col-lg-2 col-6">
                <label htmlFor="" className="form-label">ປະເພດປະກັນ</label>
                <SelectPicker name="type_fk" data={dataType} onChange={value => handleShowType(value)} placeholder={'- ເລືອກປະເພດ -'} value={selectedValue} block />
              </div>
              <div className="col-sm-4 col-lg-2 col-6">
                <label htmlFor="" className="form-label">ທາງເລືອກ</label>
                <SelectPicker name="" data={dataOption} placeholder={'ທາງເລືອກ'} onChange={value => setOptionId(value)} value={optionId} block />
              </div>
                <div className="col-sm-4 col-lg-2">
                <label htmlFor="" className="form-label">ເລກທີສັນຍາ</label>
                <InputGroup inside >
                <InputGroup.Addon>
                  <SearchIcon />
                </InputGroup.Addon>
                <Input type="text" block value={datasearch} onChange={setDataSearch}  placeholder="ເລກທີສັນຍາ" />
              </InputGroup>
                </div>
                <div className="col-sm-4 col-lg-2  mt-4">
               <button type="button" onClick={handleSearch} className="btn btn-primary px-3 me-2"><i className="fas fa-search fs-16px"></i> ຄົ້ນຫາ</button>
               <button className="btn btn-danger px-3"><i className="fa-solid fa-file-excel fs-16px"></i> Excel</button>
                </div>
            </div>
            <div className="table-responsive">
            <div className="d-lg-flex align-items-center mb-3">
              <div className="d-lg-flex d-none align-items-center text-nowrap">
                ສະແດງ:
                <select onChange={(e) => handleShowLimit(e.target.value)} className="form-select border-blue form-select-sm ms-2  ps-2 pe-30px" >
                  <option value={100} selected>100</option>
                  <option value={250}>250</option>
                  <option value={500}>500</option>
                  <option value={1000}>1000</option>
                  <option value={2500}>2500</option>
                  <option value={5000}>5000</option>
                  <option value={qtyItem}>ທັງໝົດ</option>
                </select>
              </div>
              <div className="d-lg-block d-none ms-2 text-body text-opacity-50">
                {qtyItem} ລາຍການ
              </div>
              <ul className="pagination  mb-0 ms-auto justify-content-center">
                <li className="page-item "><span role="button" onClick={handlePrevbtn}  className={`page-link  ${currentPage == pages[0] ? 'disabled' : 'border-blue'}`} >ກອນໜ້າ</span></li>
                {minPageNumberLimit >= 1?(
                   <li className="page-item"><span role="button" className="page-link disabled">...</span></li>
                ):''}
                {renderPageNumbers}
                {pages.length > maxPageNumberLimit ? (
                  <li className="page-item"><span role="button"  className="page-link disabled">...</span></li>
                ):'' }
                <li className="page-item"><span role="button" onClick={handleNextbtn} className={`page-link  ${currentPage == pages[pages.length - 1] ? 'disabled' : 'border-blue'}`}>ໜ້າຕໍ່ໄປ</span></li>
              </ul>
            
            </div>
              <table className="table table-striped table-bordered align-middle w-100 text-nowrap">
                <thead className="fs-14px bg-header">
                <tr>
                  <th className="text-nowrap">ລ/ດ</th>
                  <th className="text-nowrap">ຊື່ລູກຄ້າ</th>
                  <th className="text-nowrap">ເລກທີສັນຍາ</th>
                  <th className="text-nowrap text-center">ວັນທີເລີມສັນຍາ</th>
                  <th className="text-nowrap text-center">ວັນທີສິນສຸດສັນຍາ</th>
                  <th className="text-nowrap">ປະເພດປະກັນ</th>
                  <th className="text-nowrap">ທາງເລືອກ</th>
                  <th className="text-nowrap  text-end">ຄ່າທຳນຽມເບື້ອງຕົ້ນ</th>
                  <th className="text-nowrap  text-center">ຄ່າອາກອນ</th>
                  <th className="text-nowrap  text-end">ເປັນເງິນ</th>
                  <th className="text-nowrap  text-end">ຄ່າລົງທະບຽນ</th>
                  <th className="text-nowrap text-end">ຄ່າປະກັນໄພລວມ</th>
                  <th className="text-nowrap text-center">ສະຖານະ</th>
                  <th className="text-nowrap text-center">ວັນທີ່ຄ້າງ</th>
                </tr>
                </thead>
                {loading===false ?(
                <tbody>
                  {
                  currentItems.length > 0 ? (
                  currentItems.map((item,key)=>
                    <tr key={key}>
                        <td className="text-center">{i+key}</td>
                        <td>{item.resgitra_name}</td>
                        <td>{item.contract_no}</td>
                        <td>{moment(item.contract_start_date).format('DD/MM/YYYY')}</td>
                      <td>{moment(item.contract_end_date).format('DD/MM/YYYY')}</td>
                        <td>{item.type_in_name}</td>
                      <td>{item.options_name}</td>
                      <td className="text-end">{numeral(item.initial_fee).format('0,00')}</td>
                      <td  className="text-center">{item.persent_taxes} %</td>
                      <td  className="text-end">{numeral(item.money_taxes).format('0,00')}</td>
                      <td  className="text-end">{numeral(item.registration_fee).format('0,00')}</td>
                      <td  className="text-end">{numeral(item.insuranc_included).format('0,00')}</td>
                      <td className="text-center">{item.status_company===1?`ຈ່າຍແລ້ວ`:`ຄ້າງຈ້າຍ`}</td>
                        <td nowrap className="text-center">
                          {
                          item.status_company===1 ? moment(item.company_date).format('DD/MM/YYYY') :
                         item.days_arrears +' ວັນ' } </td>
                    </tr>
                    
                     )): (
                      <tr>
                          <td colSpan={14} className="text-center text-danger fs-16px">
                              ບໍ່ພົບຂໍ້ມູນ ໃນການຄົ້ນຫາ  
                          </td>
                      </tr>
                  )} 

                  <tr>
                  <td colSpan="7" className="text-end">ລວມຍອດທັງໝົດ:</td>
                  <td className="text-end">{numeral(totalInitialFee).format('0,00')}</td>
                  <td></td>
                  <td className="text-end">{numeral(totalMoneyTaxes).format('0,00')}</td>
                  <td className="text-end">{numeral(totalRegistrationFee).format('0,00')}</td>
                  <td className="text-end">{numeral(totalInsurancIncluded).format('0,00')}</td>
                  <td colSpan="2"></td>
                </tr>
                </tbody>
                ):(<>
                 <tbody className="bg-info">
                 {/* <Placeholder.Grid rows={5} columns={11} active  /> */}
                 <tr className="">
                          <td colSpan={14} className="bg-info">
                          <Placeholder.Paragraph rows={5}  />
                          <Loader center content="ກຳລັງໂຫລດຂໍ້ມູນ ........" className="mt-3" />
                          </td>
                      </tr>
                 </tbody>
                </>)}
              </table>
              <div class="d-md-flex align-items-center">
                <div class="me-md-auto text-md-left text-center mb-2 mb-md-0">
                  ສະແດງ 1 ຫາ {itemsPerPage} ຂອງ {qtyItem} ລາຍການ
                </div>
                <ul className="pagination  mb-0 ms-auto justify-content-center">
                <li className="page-item "><span role="button" onClick={handlePrevbtn}  className={`page-link  ${currentPage == pages[0] ? 'disabled' : 'border-blue'}`} >ກອນໜ້າ</span></li>
                {minPageNumberLimit >= 1?(
                   <li className="page-item"><span role="button" className="page-link disabled">...</span></li>
                ):''}
                {renderPageNumbers}
                {pages.length > maxPageNumberLimit ? (
                  <li className="page-item"><span role="button"  className="page-link disabled">...</span></li>
                ):'' }
                <li className="page-item"><span role="button" onClick={handleNextbtn} className={`page-link  ${currentPage == pages[pages.length - 1] ? 'disabled' : 'border-blue'}`}>ໜ້າຕໍ່ໄປ</span></li>
              </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Placeholder.Grid rows={5} columns={11} active   color='red' /> */}
    </>
  );
}
