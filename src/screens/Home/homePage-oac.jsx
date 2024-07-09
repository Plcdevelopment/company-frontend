import React, { useState,useEffect } from 'react'
import ReactApexChart from 'react-apexcharts';
import CanvasJSReact from '@canvasjs/react-charts';
import { Config } from '../../config/connenct';
import { Loader } from 'rsuite';
import axios from 'axios';
import numeral from 'numeral';
export default function HomePageOac() {
    const type=localStorage.getItem('user_type');
    const api = Config.urlApi;
    const [balance, setBalance] = useState({
        insuranc_included: 0,
        incom_finally: 0,
        expences_taxes: 0,
        net_income: 0,
        qtyAll:0,
        qty_almost:0,
        run_out:0,
        custom_qty:0
    })
    const [isLoading,setIsLoading]=useState(true);
    const fetchData = async () => {
        try {
          const res = await axios.get(api + 'home/balanch');
          const resData=res.data;
          console.log(resData)
          setBalance({
            insuranc_included: resData.data1.insuranc_included,
            incom_finally: resData.data1.incom_finally,
            expences_taxes: resData.data1.expences_pays_taxes,
            net_income: resData.data1.net_income,
            qtyAll:resData.data2.qtyAll,
            qty_almost:resData.data2.qty_almost,
            run_out:resData.data2.run_out,
            custom_qty:resData.data2.custom_qty
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      };

    const CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const optionsDonut = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            fontFamily: "LAOS",
            text: "ຍອດຂາຍ,ຍອດຮັບ ແລະ ຍອດຈ່າຍ"
        },
        data: [{
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y} ₭",
            showInLegend: true,
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} = {y} ₭",
            dataPoints: [
                { y: balance.insuranc_included, label: "ຍອດທັງໝົດ", exploded: true },
                { y: balance.incom_finally, label: "ຄອມຈ່າຍ" },
                { y: balance.expences_taxes, label: "ຄອມຮັບ" },
                { y: balance.net_income, label: "ຍອດສຸດທິ" },
            ],

        }]
    };


    //================================
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '60%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['ມັງກອນ', 'ກຸມພາ', 'ມີນາ', 'ເມສາ', 'ພຶກສະພາ', 'ມີຖຸນາ', 'ກໍລະກົດ', 'ສີງຫາ', 'ກັນຍາ', 'ຕຸລາ', 'ພະຈິກ', 'ທັນວາ'],
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "₭ " + numeral(val).format('0,00') + " ກີບ";
                    }
                },

            },
        }
    });

    const fetchDataMonth = async () => {
        try {
            const response = await fetch(api + 'home/getChartData'); // Adjust the API endpoint if necessary
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json(); // Parse JSON response
            setChartData(prevState => ({
                ...prevState,
                series: data.series
            }));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    
    useEffect(() => {
        fetchDataMonth();
        fetchData();
      }, []);
    return (
        <div id="content" class="app-content">

            <div class="row">
                <div class="col-xl-3 col-md-6">
                    <div class="widget widget-stats bg-blue border-4 border-top border-red rounded-4">
                        <div class="stats-icon text-white"><i class="fa-solid fa-user-shield"></i></div>
                        <div class="stats-info">
                            <h4 className='fs-16px'>ຈຳນວນລູກຄ້າຊື້ປະກັນໄພ {type}</h4>
                            <p>{isLoading===true?( <Loader size="md" content="ກຳລັງໂຫລດ..." />):(balance.custom_qty +' (ຄົນ)')} </p>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-md-6">
                    <div class="widget widget-stats  bg-blue border-4 border-top border-red rounded-4">
                        <div class="stats-icon text-white"><img src="./assets/img/icon/insurannce-All.png" width={'100%'} alt="" /></div>
                        <div class="stats-info">
                            <h4 className='fs-16px'>ຈຳນວນສັນຍາປະກັນໄພທັງໝົດ</h4>
                            <p>{isLoading===true?( <Loader size="md" content="ກຳລັງໂຫລດ..." />):(balance.qtyAll +' (ສັນຍາ)')}</p>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="widget widget-stats bg-blue border-4 border-top border-red rounded-4">
                        <div class="stats-icon text-orange"><img src="./assets/img/icon/giphy.gif" width={'100%'} alt="" /></div>
                        <div class="stats-info">
                            <h4 className='fs-16px'>ສັນຍາໃກ້ຈະໝົດຄວາມຄຸ້ມຄອງ</h4>
                            <p>{isLoading===true?( <Loader size="md" content="ກຳລັງໂຫລດ..." />):(balance.qty_almost +' (ສັນຍາ)')} </p>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="widget widget-stats bg-blue border-4 border-top border-red rounded-4">
                        <div class="stats-icon text-white"><i class="fa-solid fa-users-slash" /></div>
                        <div class="stats-info">
                            <h4 className='fs-16px'>ສັນຍາໝົດຄວາມຄຸ້ມຄອງ</h4>
                            <p>{isLoading===true?( <Loader size="md" content="ກຳລັງໂຫລດ..." />):(balance.run_out +' (ສັນຍາ)')} </p>
                        </div>
                    </div>
                </div>

            </div>
            <div class="panel panel-inverse">
                <div class="panel-body">
                    <CanvasJSChart options={optionsDonut} />
                </div>
            </div>
            <div class="panel panel-inverse">
                <div class="panel-body">
                    <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />

                </div>
            </div>
        </div>
    )
}
