import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Row } from "./row";
import { useEffect, useState } from 'react';
import { api } from "../../../services/api";
import { FilterOption, Filter } from "./styles";
import { orderStatusOptions } from "./orderStatus";

export function Orders() {
    const [orders, setOrders] = useState([]);
    const [rows, setRows] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [activeStatus, setActiveStatus] = useState(0);

    // Carrega os pedidos na inicialização
    useEffect(() => {
        async function loadOrders() {
            try {
                const { data } = await api.get("orders");
                setOrders(data);
            } catch (error) {
                console.error("Erro ao carregar pedidos:", error);
            }
        }

        loadOrders();
    }, []);

    // Atualiza filteredOrders sempre que activeStatus ou orders mudarem
    useEffect(() => {
        if (activeStatus === 0) {
            setFilteredOrders(orders);
        } else {
            const statusOption = orderStatusOptions.find(opt => opt.id === activeStatus);
            if (statusOption) {
                const filtered = orders.filter(order => order.status === statusOption.value);
                setFilteredOrders(filtered);
            }
        }
    }, [activeStatus, orders]);

    // Atualiza as linhas da tabela quando filteredOrders mudar
    useEffect(() => {
        const newRows = filteredOrders.map(order => ({
            name: order?.user?.name ?? "Desconhecido",
            orderId: order._id,
            date: order.createdAt,
            status: order.status,
            products: order.products,
        }));
        setRows(newRows);
    }, [filteredOrders]);

    function handleStatusClick(statusId) {
        setActiveStatus(statusId);
    }

    return (
        <>
            <Filter>
                {orderStatusOptions.map((status) => (
                    <FilterOption
                        key={status.id}
                        onClick={() => handleStatusClick(status.id)}
                        $isActiveStatus={activeStatus === status.id}
                    >
                        {status.label}
                    </FilterOption>
                ))}
            </Filter>

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Pedido</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Data do Pedido</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row
                                key={row.orderId}
                                row={row}
                                orders={orders}
                                setOrders={setOrders}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
