import NotificationButton from '../NotificationButton'
import './styles.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
//import axios from 'axios';
//import { BASE_URL } from './../../utils/request';
//import { Sale } from "../../models/sale";

/* Instalação datepicker --> yarn add react-datepicker@4.8.0 @types/react-datepicker@4.4.2 */

function SalesCard() {

    const min = new Date(new Date().setDate(new Date().getDate() - 365));
    const max = new Date();

    const [minDate, setMinDate] = useState(new Date(min));
    const [maxDate, setMaxDate] = useState(new Date(max));

    const [sales, setSales] = useState<Sale[]>([]);
    /* O ponto e vírgula no java script é opcional */

    /*TESTANDO REQUISIÇÃO NO BACKEND COM DOIS ARGUMENTOS 1 () => {}, 2 []*/
    /* NO TERMINAL FRONTEND DAR O COMANDO YARN START */

    /*useEffect(() => {
        console.log("TESTE");
    }, []);*/

    useEffect(() => {
        const dmin = minDate.toISOString().slice(0, 10);
        const dmax = minDate.toISOString().slice(0, 10);

        axios.get(`${BASE_URL}/sales?minDate=${dmin}&maxDate=${dmax}`)
            .then(response => {
                setSales(response.data.content);
            });
    }, [minDate, maxDate]);

    /* FIM DO TESTE */

    return (
        <div className="dsmeta-card">
            <h2 className="dsmeta-sales-title">Vendas</h2>
            <div>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={minDate}
                        onChange={(date: Date) => setMinDate(date)}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={maxDate}
                        onChange={(date: Date) => setMaxDate(date)}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
            </div>

            <div>
                <table className="dsmeta-sales-table">
                    <thead>
                        <tr>
                            <th className="show992">ID</th>
                            <th className="show576">Data</th>
                            <th>Vendedor</th>
                            <th className="show992">Visitas</th>
                            <th className="show992">Vendas</th>
                            <th>Total</th>
                            <th>Notificar</th>
                        </tr>
                    </thead>
                    <tbody>

                        {sales.map(sale => {
                            return(
                                <tr key={sale.id}>
                                    <td className="show992">{sale.id}</td>
                                    <td className="show576">{new Date(sale.date).toLocaleDateString()}</td>
                                    <td>{sale.sellerName}</td>
                                    <td className="show992">{sale.visited}</td>
                                    <td className="show992">{sale.deals}</td>
                                    <td>R$ {sale.amount.toFixed(2)}</td>
                                    <td>
                                        <div className="dsmeta-red-btn-container">
                                            <NotificationButton saleId={sale.id}/>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>

                </table>
            </div>

        </div >


    )
}

export default SalesCard

