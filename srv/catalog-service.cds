using {NorthWind as external} from './external/NorthWind.csn';

service CatalogService {

    @readonly
    entity Products as projection on external.Products {
        key ID, Name, Description, ReleaseDate, DiscontinuedDate, Rating, Price
    };

    @readonly
    entity Persons as projection on external.Persons {
        key ID, 
        Name, 
        PersonDetail
    };

    @readonly
    entity PersonDetails as projection on external.PersonDetails {
        key PersonID, 
        Phone
    };

    @readonly
    entity Suppliers as projection on external.Suppliers {
        key ID: Integer, 
        Name: String,
        Address
    };


    @readonly 
    type Address: {
    //  Street: String;
    //  City: String;
    //  ZipCode: String;
     Country: String;       
    };



}

annotate CatalogService.Products with @(UI : {
    Identification : [{Value : ID}],
    LineItem       : [
        {
            $Type : 'UI.DataField',
            Value : Name
        },
        {
            $Type : 'UI.DataField',
            Value : Description
        }
    ]
});

annotate CatalogService.Products with {
    Name        @title : '{i18n>name}';
    Description @title : '{i18n>description}';
    Price       @title : '{i18n>price}';
};
