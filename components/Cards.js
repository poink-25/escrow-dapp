import React from "react";
import { Card, Container } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

class Cards extends React.Component {
    
    renderCards() {
        const contractBalance = this.props.balance
        const clientAddress = this.props.client
        const freelancerAddress = this.props.freelancer
        const arbiterAddress = this.props.arbiter
        
        const items = [
            {
                key: 1,
                header: <h3>{contractBalance}</h3>,
                meta: <p>Contract Balance (ETH)</p>,
                description: <p>Amount of ether currently stored on the contract</p>,
                style: { overflowWrap: 'break-word', backgroundColor: '#323232' }
            },
            {
                key: 2,
                header: <h3>{clientAddress}</h3>,
                meta: <p>Client Wallet Address</p>,
                description: <p>{clientAddress == this.props.account ? 'You are the client' : null}</p>,
                style: { overflowWrap: 'break-word', backgroundColor: clientAddress == this.props.account ? '#0E6EB8' : '#323232' }
            },
            {
                key: 3,
                header: <h3>{freelancerAddress}</h3>,
                meta: <p>Freelancer Wallet Address</p>,
                description: <p>{freelancerAddress == this.props.account ? 'You are the freelancer' : null}</p>,
                style: { overflowWrap: 'break-word', backgroundColor: freelancerAddress == this.props.account ? '#0E6EB8' : '#323232' }
            },
            {
                key: 4,
                header: <h3>{arbiterAddress}</h3>,
                meta: <p>Arbiter Wallet Address</p>,
                description: <p>{arbiterAddress == this.props.account ? 'You are the arbiter' : null}</p>,
                style: { overflowWrap: 'break-word', backgroundColor: arbiterAddress == this.props.account ? '#0E6EB8' : '#323232' }
            }
        ];
        
        return <Card.Group items={items} />
    }
    
    render() {
        return (
            <Container>
                {this.renderCards()}
            </Container>
        )
    }
}

export default Cards;