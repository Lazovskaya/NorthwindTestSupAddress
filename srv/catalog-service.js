const cds = require('@sap/cds');
const axios = require('axios');

module.exports = cds.service.impl(async function() {
	const { Products, Persons, PersonDetails, Suppliers } = this.entities;
	const service = await cds.connect.to('Northwind');
	this.on('READ', Products, request => {
		return service.tx(request).run(request.query);
    });
    
	this.on('READ', Persons, request => {
		return service.tx(request).run(request.query);
    }); 
    
    this.on('READ', PersonDetails, request => {
		return service.tx(request).run(request.query);
    });

    this.on('READ', Suppliers, request => {
        var response;
        const cqn = SELECT.from(Suppliers)
        return resSuppliers = service.tx(request).run(cqn).then(items => {
            if (items.length == 0) { // related Case does not exist
                return request.error(412, `Related Case with DealID ${
                    request.data.ID
                } doesn't exist`)
            } else { items.forEach(item => {
                console.log(item.value);
                })
            }
            });
        });
    
    // this.on('READ', Suppliers, _getSuppliers)

    // async function _getSuppliers(request) {
    // let  { Address_City, Address_Country } = await _checkAddress(request);
    // let response;
    // const cqn = SELECT.from(Suppliers).where({ID: request.data.ID})
    // //const cqn2 = SELECT.from(Address).where({ID: request.data.ID})    
    
    // response.Address_City = Address_City;
    // response.Address_Country = Address_Country;
    // response = await service.tx(request).run(cqn); 
    // return response;   
    // }

    // async function _checkAddress(req) {
    //         const partnerConSetpath = "/Suppliers?$filter=ID eq " + req.params[0];
    //         const prmRes = await _connectDestionation('Northwind', partnerConSetpath);
    //         console.log("Response Northwind: ", prmRes.value[0].Address);
    //         var Address = {
    //             Address_City: "",
    //             Address_Country: ""
    //         }

    //         if (prmRes.value.length > 0) {
    //             PartnerCon = {
    //                 Address_City: prmRes.value[0].Address.City,
    //                 Address_Country: prmRes.value[0].Address.Country
    //             }
    //         }

    //         return PartnerCon;
    //     }

    // async function _connectDestionation(destName, path) { // call destination service
    //     const destCred = _getServiceAuth("destination", "Northwind");
    //     const destJwtToken = await _fetchJwtToken(destCred.url, destCred.clientid, destCred.clientsecret);
    //     // console.log("Destion Token ", destJwtToken);
    //     const destConfi = await _readDestinationConfig(destName, destCred.uri, destJwtToken);
    //     // console.log("Destination PRM : ", destConfi);

    //     // // call onPrem system via connectivity service and Cloud Connector
    //     // const conCred = _getServiceAuth("xsuaa", "Northwind-uaa");
    //     // const conJwtToken = await _fetchJwtToken(conCred.token_service_url, conCred.clientid, conCred.clientsecret);
    //     // // console.log("connectivity cred: ", conCred);
    //     const result = await _callOnPrem(destConfi, path);
    //     return result;
    // }
    
    //   async function _callOnPrem(destiConfi, path) {
    //     return new Promise((resolve, reject) => {
    //         const targetUrl = destiConfi.URL + path
    //         // const encodedUser = Buffer.from(destiConfi.User + ':' + destiConfi.Password).toString("base64")

    //         const config = {
    //             headers: {
    //                 Authorization: "NoAuthentication"
    //             }
    //         }
    //         axios.get(targetUrl, config).then(response => {
    //             resolve(response.data)
    //         }).catch(error => {
    //             console.log("Calling destination errors: ", JSON.stringify(error.response.data));
    //             reject(error)
    //         })
    //     })
    // }

    // function _getServiceAuth(serviceType, serviceName) {

    //     const vcap = JSON.parse(process.env["VCAP_SERVICES"]);
    //     const serviceInstances = vcap[serviceType];

    //     if (serviceInstances == null || serviceInstances == undefined) { // incase the service was not bind
    //         return null;
    //     }
    //     var serviceInstance;
    //     for (let index = 0; index < serviceInstances.length; index++) {
    //         serviceInstance = serviceInstances[index];
    //         if (serviceInstance["name"] == serviceName) {
    //             return serviceInstance['credentials'];
    //         }
    //     }
    //     return null;

    // }

    // async function _fetchJwtToken(oauthUrl, oauthClient, oauthSecret) {
    //     return new Promise((resolve, reject) => {
    //         const tokenUrl = oauthUrl + '/oauth/token?grant_type=client_credentials&response_type=token'
    //         const config = {
    //             headers: {
    //                 Authorization: "Basic " + Buffer.from(oauthClient + ':' + oauthSecret).toString("base64")
    //             }
    //         }
    //         axios.get(tokenUrl, config).then(response => {
    //             resolve(response.data.access_token)
    //         }).catch(error => {
    //             reject(error)
    //         })
    //     })
    // }

    // // Call Destination Service. Result will be an object with Destination Configuration info
    // async function _readDestinationConfig(destinationName, destUri, jwtToken) {
    //     return new Promise((resolve, reject) => {
    //         const destSrvUrl = destUri + '/destination-configuration/v1/destinations/' + destinationName
    //         const config = {
    //             headers: {
    //                 Authorization: 'Bearer ' + jwtToken
    //             }
    //         }
    //         axios.get(destSrvUrl, config).then(response => {
    //             resolve(response.data.destinationConfiguration)
    //         }).catch(error => {
    //             reject(error)
    //         })
    //     })
    // }
    
    // // }); 
    
});