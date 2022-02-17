Companies House Public Data API reference
Registered office address
Operation	HTTP Request	Description
get	
GET /company/{companyNumber}/registered-office-address
Registered Office Address
Company profile
Operation	HTTP Request	Description
get	
GET /company/{companyNumber}
Company profile
Search
Operation	HTTP Request	Description
advanced company search	
GET /advanced-search/companies
Advanced search for a company
search all	
GET /search
Search All
search companies	
GET /search/companies
Search companies
search officers	
GET /search/officers
Search company officers
search disqualified officers	
GET /search/disqualified-officers
Search disqualified officers
search companies alphabetically	
GET /alphabetic-search/companies
Search for a company
search dissolved companies	
GET /dissolved-search/companies
Search for a dissolved company
Officers
Operation	HTTP Request	Description
list	
GET /company/{company_number}/officers
Company Officers
get	
GET /company/{company_number}/appointments/{appointment_id}
Get a company officer appointment
Registers
Operation	HTTP Request	Description
get	
GET /company/{company_number}/registers
Company registers
Charges
Operation	HTTP Request	Description
get	
GET /company/{company_number}/charges/{charge_id}
list	
GET /company/{company_number}/charges
Charges
Filing history
Operation	HTTP Request	Description
get	
GET /company/{company_number}/filing-history/{transaction_id}
filingHistoryItem resource
list	
GET /company/{company_number}/filing-history
filingHistoryList resource
Insolvency
Operation	HTTP Request	Description
get	
GET /company/{company_number}/insolvency
Exemptions
Operation	HTTP Request	Description
get	
GET /company/{company_number}/exemptions
Officer disqualifications
Operation	HTTP Request	Description
get corporate officer	
GET /disqualified-officers/corporate/{officer_id}
Get a corporate officers disqualifications
get natural officer	
GET /disqualified-officers/natural/{officer_id}
Get natural officers disqualifications
Officer appointments
Operation	HTTP Request	Description
list	
GET /officers/{officer_id}/appointments
Officer Appointment List
UK Establishments
Operation	HTTP Request	Description
get	
GET /company/{company_number}/uk-establishments
Company UK Establishments
Persons with significant control
Operation	HTTP Request	Description
get corporate entities	
GET /company/{company_number}/persons-with-significant-control/corporate-entity/{psc_id}
Get the corporate entity with significant control
get individual	
GET /company/{company_number}/persons-with-significant-control/individual/{psc_id}
Get the individual person with significant control
get legal persons	
GET /company/{company_number}/persons-with-significant-control/legal-person/{psc_id}
Get the legal person with significant control
get statement	
GET /company/{company_number}/persons-with-significant-control-statements/{statement_id}
Get the person with significant control statement
get super secure person	
GET /company/{company_number}/persons-with-significant-control/super-secure/{super_secure_id}
Get the super secure person with significant control
list	
GET /company/{company_number}/persons-with-significant-control
List the company persons with significant control
list statements	
GET /company/{company_number}/persons-with-significant-control-statements
List the company persons with significant control statements



Parameter name	Value	    Description	Additional
start_index	        string	The point at which results will start from i.e show search results from result 20 (used for paging)
company_name	    string	The company name (must contain) advanced search filter
location	        string	The location advanced search filter
incorporated_from	date    The incorporated from date advanced search filter
incorporated_to	    date    The incorporated to date advanced search filter
sic_codes	        list	The SIC codes advanced search filter. 
                            To search using multiple values, use a comma delimitated list or multiple of the same key i.e. sic_codes=xxx&sic_codes=yyy
company_status	    list	The company status advanced search filter. 
                            To search using multiple values, use a comma delimitated list or multiple of the same key i.e. company_status=xxx&company_status=yyy
company_type	    list	The company type advanced search filter. 
                            To search using multiple values, use a comma delimitated list or multiple of the same key i.e. company_type=xxx&company_type=yyy
dissolved_from	    date	The dissolved from date advanced search filter
dissolved_to	    date    The dissolved to date advanced search filter
size				string	The maximum number of results matching the search term(s) to return with a range of 1 to 5000






/*
CompanyName
CompanyNumber
    RegAddress.CareOf
    RegAddress.POBox
    RegAddress.AddressLine1
    RegAddress.AddressLine2
RegAddress.PostTown
    RegAddress.County
    RegAddress.Country
RegAddress.PostCode
    CompanyCategory
CompanyStatus
    CountryOfOrigin
DissolutionDate
IncorporationDate
    Accounts.AccountRefDay
    Accounts.AccountRefMonth
    Accounts.NextDueDate
    Accounts.LastMadeUpDate
    Accounts.AccountCategory
    Returns.NextDueDate
    Returns.LastMadeUpDate
    Mortgages.NumMortCharges
    Mortgages.NumMortOutstanding
    Mortgages.NumMortPartSatisfied
    Mortgages.NumMortSatisfied
    SICCode.SicText_1
    SICCode.SicText_2
    SICCode.SicText_3
    SICCode.SicText_4
    LimitedPartnerships.NumGenPartners
    LimitedPartnerships.NumLimPartners
URI
PreviousName_1.CONDATE
PreviousName_1.CompanyName
PreviousName_2.CONDATE
PreviousName_2.CompanyName
PreviousName_3.CONDATE
PreviousName_3.CompanyName
PreviousName_4.CONDATE
PreviousName_4.CompanyName
PreviousName_5.CONDATE
PreviousName_5.CompanyName
PreviousName_6.CONDATE
PreviousName_6.CompanyName
PreviousName_7.CONDATE
PreviousName_7.CompanyName
PreviousName_8.CONDATE
PreviousName_8.CompanyName
PreviousName_9.CONDATE
PreviousName_9.CompanyName
PreviousName_10.CONDATE
PreviousName_10.CompanyName
    ConfStmtNextDueDate
    ConfStmtLastMadeUpDate

CompanyName, CompanyNumber,RegAddress.CareOf,RegAddress.POBox,RegAddress.AddressLine1, RegAddress.AddressLine2,RegAddress.PostTown,RegAddress.County,RegAddress.Country,RegAddress.PostCode,CompanyCategory,CompanyStatus,CountryOfOrigin,DissolutionDate,IncorporationDate,Accounts.AccountRefDay,Accounts.AccountRefMonth,Accounts.NextDueDate,Accounts.LastMadeUpDate,Accounts.AccountCategory,Returns.NextDueDate,Returns.LastMadeUpDate,Mortgages.NumMortCharges,Mortgages.NumMortOutstanding,Mortgages.NumMortPartSatisfied,Mortgages.NumMortSatisfied,SICCode.SicText_1,SICCode.SicText_2,SICCode.SicText_3,SICCode.SicText_4,LimitedPartnerships.NumGenPartners,LimitedPartnerships.NumLimPartners,URI,PreviousName_1.CONDATE, PreviousName_1.CompanyName, PreviousName_2.CONDATE, PreviousName_2.CompanyName,PreviousName_3.CONDATE, PreviousName_3.CompanyName,PreviousName_4.CONDATE, PreviousName_4.CompanyName,PreviousName_5.CONDATE, PreviousName_5.CompanyName,PreviousName_6.CONDATE, PreviousName_6.CompanyName,PreviousName_7.CONDATE, PreviousName_7.CompanyName,PreviousName_8.CONDATE, PreviousName_8.CompanyName,PreviousName_9.CONDATE, PreviousName_9.CompanyName,PreviousName_10.CONDATE, PreviousName_10.CompanyName,ConfStmtNextDueDate, ConfStmtLastMadeUpDate
"! LTD","08209948","","","METROHOUSE 57 PEPPER ROAD","HUNSLET","LEEDS","YORKSHIRE","","LS10 2RU","Private Limited Company","Active","United Kingdom","","11/09/2012","30","9","30/06/2022","30/09/2020","DORMANT","09/10/2016","11/09/2015","0","0","0","0","99999 - Dormant Company","","","","0","0","http://business.data.gov.uk/id/company/08209948","","","","","","","","","","","","","","","","","","","","","25/09/2022","11/09/2021"

*/
