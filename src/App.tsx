import React, {ChangeEvent, Component} from 'react';
import {AxiosResponse} from "axios";
import {MDBContainer, MDBCol, MDBRow} from "mdbreact";

const axios = require('axios').default;

class DynamicDropdown extends Component {

    state = {
        organisations: [],
        branches: [],
        selectedOne: "",
        selectedTwo: ""
    };

    componentDidMount() {
        this.getOrganisations();
    };

    async getOrganisations() {
        await axios.get("http://localhost:3000/organisation/selectAllOrganisations")
            .then((response: AxiosResponse) => {
                this.setState({
                    organisations: response.data.success.data
                });
            });
    };

    async getBranches(orgID: Number) {
        await axios.post("http://localhost:3000/branch/selectAllBranchByOrgID",
            {
                "id": orgID
            })
            .then((response: AxiosResponse) => {
                this.setState({
                    branches: response.data.success.data
                });

            })
    };

    handleDropdownOne = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({[event.target.name]: [event.target.value]});
        this.getBranches(Number(event.target.value));
    };

    handleDropdownTwo = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({[event.target.name]: [event.target.value]});
    };


    render() {
        return (
            <div className="App">
                <MDBContainer>
                    <MDBRow>
                        <MDBCol xs="12" sm="12" md="12" lg="12">
                            <h1>Dynamic Dependant Dropdowns</h1>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol xs="12" sm="12" md="6" lg="6">
                            <select onChange={this.handleDropdownOne} name="selectedOne" className="browser-default custom-select">
                                <option>--Select Organisation--</option>
                                {
                                    this.state.organisations.map(
                                        (organisation: any) =>
                                            <option key={organisation.id} value={organisation.id}>
                                                {organisation.name}
                                            </option>
                                    )
                                }
                            </select>
                        </MDBCol>
                        <MDBCol xs="12" sm="12" md="6" lg="6">
                            <select onChange={this.handleDropdownTwo} name="selectedTwo" className="browser-default custom-select">
                                <option>--Select Branches--</option>
                                {
                                    this.state.branches.map(
                                        (branch: any) =>
                                            <option key={branch.branch_id} value={branch.branch_id}>
                                                {branch.branch_name}
                                            </option>
                                    )
                                }
                            </select>
                        </MDBCol>

                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }

}

export default DynamicDropdown;
