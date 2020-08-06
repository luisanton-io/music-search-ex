import React, { Component, ChangeEvent } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SearchResult } from '../interfaces/SearchResult'
import { Datum } from '../interfaces/Datum'
import uniqid from 'uniqid'

interface SearchState {
    query: string,
    results?: SearchResult
}

class Search extends Component<{}, SearchState> {

    state: SearchState = {
        query: ""
    }

    typing = (e: React.SyntheticEvent): void => {
        let target = e.target as HTMLInputElement;
        if (target) this.setState({
            query: target.value
        })
    }

    handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        let response = await fetch ("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + this.state.query, {
            method: "GET",
            headers: {
                "x-rapidapi-key": "d0d2ab2082mshf0ed0f7809c063cp12ba30jsn90f056f06ba9",
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
            }
        })

        let results = await response.json()

        console.log(results)
        this.setState({results})
    }

    render() {
        return (
            <Container>
                <Row style={{height:"100vh"}}>
                    <Col xs={10} md={8} lg={6} className="d-flex mx-auto">
                            <Form 
                                className="position-relative d-flex mx-auto my-4 mb-auto"
                                onSubmit={this.handleSubmit}>
                                <Form.Group className="my-0">
                                    <FontAwesomeIcon 
                                        className="text-white-50 position-absolute" 
                                        style={{top:"0.77rem", left: "5%", fontSize:"0.8rem"}}
                                        icon={faSearch} />
                                    <Form.Control 
                                        className="mx-auto rounded-pill bg-transparent text-white text-center" 
                                        onChange={this.typing}
                                        type="text" placeholder="Search" />
                                </Form.Group>
                            </Form>
                    </Col>
                    {
                        this.state.results &&
                        <Col xs={12} className="my-3">
                            <Row>
                            {
                                this.state.results.data.map( (datum: Datum) =>
                                    <Col xs={12} md={4} className="my-2" key={uniqid()}>
                                        <Card className="bg-transparent" style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={datum.album.cover_big} />
                                            <Card.Body>
                                                <div className="d-flex flex-column align-items-center">
                                                    <Card.Title className="my-0 text-white">
                                                        {datum.title}
                                                    </Card.Title>
                                                    <span className="text-muted">{datum.album.title}</span>
                                                    <span className="text-muted">{datum.artist.name}</span>
                                                    <Button variant="outline-secondary" className="rounded-pill my-2" >Show Details</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                     </Col>
                                )
                            }
                            </Row>
                        </Col>
                    }
                </Row>
            </Container>

        );
    }
}

export default Search;