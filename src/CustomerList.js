import React from 'react';
import { Table, Popover, OverlayTrigger } from 'react-bootstrap';
import { useRequest } from './_helpers/useRequest';
import LoadingRequest from './LoadingRequest';

// helper for easier adding up amounts in array
function sumAmounts(input){
    return input.reduce((prev, curr) => (prev + curr));
}

let popCount = 0;

function DetailsLink(props){

    const { amounts } = props;

    const counter = (new Array(amounts.spent.length)).fill('');

    const popId = 'pop' + (popCount += 1);

    const detailsPopover = (
        <Popover id={popId}>
            {/*<Popover.Title>Details</Popover.Title>*/}
            <Popover.Content style={{ padding: '.5rem' }}>
                <Table striped bordered hover size="sm" style={{ margin: 0 }}>
                    <thead>
                    <tr>
                        <th>Spent</th>
                        <th>Points</th>
                    </tr>
                    </thead>
                    <tbody>
                    {counter.map(function(item, i){
                        return (
                            <tr key={i}>
                                <td>${amounts.spent[i]}</td>
                                <td>{amounts.rewards[i]}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </Popover.Content>
        </Popover>
    )

    return (
            <OverlayTrigger rootClose={true} trigger="click" placement="right" overlay={detailsPopover}>
                <a href="#!">{props.children}</a>
            </OverlayTrigger>
    )

}

function CustomerTableHeader(props){
    return <thead>
    <tr>
        <th>Customer Name</th>
        {(new Array(props.count)).fill('').map((x, i) => (
            <th colSpan={3}>Month {i + 1}</th>
        ))}
        <th>Total Spent</th>
        <th>Total Points</th>
    </tr>
    </thead>
}

function CustomerRow(props){

    const { count, customer } = props;

    const amounts = customer.amounts;

    const customerTotals = {
        spent: amounts.map((item, i) => {
            return item.totals.spent
        }).reduce((prev, curr) => prev + curr),
        rewards: amounts.map((item, i) => {
            return item.totals.rewards
        }).reduce((prev, curr) => prev + curr)
    }

    const monthlyTotals = amounts.map(function(mo, i){
        return {
            spentx: mo.spent.reduce(function(prev, curr){
                return prev + curr
            }),
            spent: sumAmounts(mo.spent),
            rewardsx: mo.rewards.reduce(function(prev, curr){
                return prev + curr
            }),
            rewards: sumAmounts(mo.rewards)
        }
    })

    return <tr>
        <td style={{ textAlign: 'left', paddingLeft: '10px' }}>{`${customer.firstName} ${customer.lastName}`}</td>
        {monthlyTotals.map((item, i) => (
            <>
                <td>${item.spent}</td>
                <td>{item.rewards} pts</td>
                <td><DetailsLink amounts={amounts[i]}>info</DetailsLink></td>
            </>
        ))}
        <td>${customerTotals.spent}</td>
        <td>{customerTotals.rewards}</td>
    </tr>
}

function CustomerTable(props){
    {/* look at the first item to determine number of month header rows */}
    const monthCount = props.data[0].amounts.length;
    return <Table striped bordered hover size="sm" variant={'dark'}>
        <CustomerTableHeader count={monthCount}/>
        <tbody>
        {props.data.map((item, idx) => (
            <CustomerRow key={idx} count={monthCount} customer={item}/>
        ))}
        </tbody>
    </Table>

}

export default function CustomerList(){

    const [response, request] = useRequest({
            url: 'data/customerData.json',
            method: 'GET'
        }
    );

    return <>
        {!response || !response.data ? (
            <LoadingRequest/>
        ) : (
            <CustomerTable data={response.data}/>
        )}
    </>

}
