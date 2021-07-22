

document.getElementById("mybutton").addEventListener("click", myFunction);

function myFunction() {

     var baseUrl = $("#URL").val();
     var authToken = $("#AuthToken").val();

     console.log("URL:", baseUrl);

     console.log("authtoken:", authToken)

     authBearerToken = "Bearer " + authToken.trim();

     requestURL = baseUrl + "/fees-register/fees";

     var settings = {
          "url": requestURL,
          "method": "GET",
          "headers": {
               "Authorization": authBearerToken 
          },
     }; // end of settings

     $.ajax(settings).done(function (response) {
          console.log(response)

          var feesExcel = [];
          var totalFeeCount = 0;
          var currentDate = new Date();

          var downloadfees = response;
          var monthNames = ["January", "February", "March", "April", "May", "June",
               "July", "August", "September", "October", "November", "December"
          ];
          var totalResults = Object.keys(downloadfees).length;


          for (var i = 0; i < totalResults; i++) {

               feeVersionTotalCount = Object.keys(downloadfees[i].fee_versions).length


               for (var feeVersionCount = 0; feeVersionCount < feeVersionTotalCount; feeVersionCount++) {

                    var jsonData = {};
                    jsonData['code'] = downloadfees[i].code;

                    jsonData['Description'] = downloadfees[i].fee_versions[feeVersionCount].description;

                    if (downloadfees[i].fee_versions[feeVersionCount].flat_amount !== undefined) {
                         let amount_ext = downloadfees[i].fee_versions[feeVersionCount].flat_amount.amount;
                         let amount_formatted = parseFloat(amount_ext).toFixed(2)
                         jsonData['Amount'] = '£ ' + amount_formatted.toString();
                    }
                    else if (downloadfees[i].fee_versions[feeVersionCount].volume_amount !== undefined) {
                         let amount_ext = downloadfees[i].fee_versions[feeVersionCount].volume_amount.amount;
                         let amount_formatted = parseFloat(amount_ext).toFixed(2)
                         jsonData['Amount'] = '£ ' + amount_formatted.toString();
                    }
                    else if (downloadfees[i].fee_versions[feeVersionCount].percentage_amount !== undefined) {
                         let amount_ext = downloadfees[i].fee_versions[feeVersionCount].percentage_amount.percentage;
                         let amount_formatted = parseFloat(amount_ext).toFixed(2)
                         jsonData['Amount'] = '£ ' + amount_formatted.toString();
                    }
                    else {
                         jsonData['Amount'] = '';
                    }

                    jsonData['Statutory_Instrument'] = downloadfees[i].fee_versions[feeVersionCount].statutory_instrument;
                    jsonData['SI _Ref_ID'] = downloadfees[i].fee_versions[feeVersionCount].si_ref_id;
                    jsonData['Fee_Order_Name'] = downloadfees[i].fee_versions[feeVersionCount].fee_order_name;
                    jsonData['Service'] = downloadfees[i].service_type.name;
                    jsonData['Jurisdiction1'] = downloadfees[i].jurisdiction1.name;
                    jsonData['Jurisdiction2'] = downloadfees[i].jurisdiction2.name;
                    jsonData['Event'] = downloadfees[i].event_type.name;
                    if (downloadfees[i].min_range !== undefined) {
                         jsonData['Range_from'] = parseFloat(downloadfees[i].min_range).toFixed(2);
                    }
                    else { jsonData['Range_from'] = ''; }
                    if (downloadfees[i].max_range !== undefined) {
                         jsonData['Range_to'] = parseFloat(downloadfees[i].max_range).toFixed(2);
                    }
                    else { jsonData['Range_to'] = ''; }
                    jsonData['Unit'] = downloadfees[i].range_unit;
                    jsonData['Fee_Type'] = downloadfees[i].fee_type;

                    if (downloadfees[i].fee_versions[feeVersionCount].flat_amount !== undefined) {
                         jsonData['Amount_type'] = 'Flat';
                    }
                    else if (downloadfees[i].fee_versions[feeVersionCount].volume_amount !== undefined) {
                         jsonData['Amount_type'] = 'Volume';
                    }
                    else {
                         jsonData['Amount_type'] = 'Percentage';
                    }

                    jsonData['Channel'] = downloadfees[i].channel_type.name;
                    jsonData['Keyword'] = downloadfees[i].Keyword;
                    jsonData['Applicant type'] = downloadfees[i].applicant_type.name;
                    jsonData['Version'] = downloadfees[i].fee_versions[feeVersionCount].version;
                    jsonData['Direction'] = downloadfees[i].fee_versions[feeVersionCount].direction;
                    if (downloadfees[i].fee_versions[feeVersionCount].valid_from !== undefined) {
                         var date_ext = downloadfees[i].fee_versions[feeVersionCount].valid_from;
                         var date_formatted = date_ext.substr(8, 2) + ' ' + monthNames[date_ext.substr(5, 2) - 1] + ' ' + date_ext.substr(0, 4);
                         jsonData['Valid_from'] = date_formatted
                    }
                    else { jsonData['Valid_from'] = ''; }
                    if (downloadfees[i].fee_versions[feeVersionCount].valid_to !== undefined) {
                         var date_ext = downloadfees[i].fee_versions[feeVersionCount].valid_to;
                         var date_formatted = date_ext.substr(8, 2) + ' ' + monthNames[date_ext.substr(5, 2) - 1] + ' ' + date_ext.substr(0, 4);
                         jsonData['Valid_to'] = date_formatted
                    }
                    else { jsonData['Valid_to'] = ''; }
                    jsonData['Status'] = downloadfees[i].fee_versions[feeVersionCount].status;
                    jsonData['Memo'] = downloadfees[i].fee_versions[feeVersionCount].memo_line;
                    jsonData['Natural_Account_Code'] = downloadfees[i].fee_versions[feeVersionCount].natural_account_code;


                    feesExcel.push(jsonData);
                    totalFeeCount = totalFeeCount + 1;
               }
          }

          console.log("part one ")
          console.log("totalFeeCount :", totalFeeCount)


          var feesExcelDownload = [];
          for (var j = 0; j < totalFeeCount; j++) {


               var JsonInsert = {};
               if (feesExcel[j].Status === 'approved') {

                    JsonInsert['code'] = feesExcel[j].code;
                    JsonInsert['Description'] = feesExcel[j].Description;
                    JsonInsert['Amount'] = feesExcel[j].Amount;
                    JsonInsert['Statutory Instrument'] = feesExcel[j].Statutory_Instrument;
                    JsonInsert['SI Ref ID'] = feesExcel[j].SI_Ref_ID;
                    JsonInsert['Fee Order Name'] = feesExcel[j].Fee_Order_Name;
                    JsonInsert['Service'] = feesExcel[j].Service;
                    JsonInsert['Jurisdiction1'] = feesExcel[j].Jurisdiction1;
                    JsonInsert['Jurisdiction2'] = feesExcel[j].Jurisdiction2;
                    JsonInsert['Event'] = feesExcel[j].Event;
                    JsonInsert['Range from'] = feesExcel[j].Range_from;
                    JsonInsert['Range to'] = feesExcel[j].Range_to;
                    JsonInsert['Fee Type'] = feesExcel[j].Fee_Type;
                    JsonInsert['Amount type'] = feesExcel[j].Amount_type;
                    JsonInsert['%'] = '';
                    JsonInsert['Channel'] = feesExcel[j].Channel;
                    JsonInsert['Keyword'] = feesExcel[j].Keyword;
                    JsonInsert['Applicant type'] = feesExcel[j].Applicant_type;
                    JsonInsert['Version'] = feesExcel[j].Version;
                    JsonInsert['Direction'] = feesExcel[j].Direction;
                    JsonInsert['Valid from'] = feesExcel[j].Valid_from;
                    JsonInsert['Valid_to'] = feesExcel[j].Valid_to;

                    if (feesExcel[j].Valid_to != '') {
                         var validToDate = new Date(feesExcel[j].Valid_to)
                    } else { var validToDate = '' }
                    if (feesExcel[j].Valid_from != '') {
                         var validFromDate = new Date(feesExcel[j].Valid_from)
                    } else { var validFromDate = '' }

                    if (validToDate != '' && validToDate < currentDate) {
                         JsonInsert['Status'] = 'Discontinued fees';
                    }
                    else if (validFromDate != '' && validFromDate > currentDate) {
                         JsonInsert['Status'] = 'Approved but not live fees';
                    }
                    else {
                         JsonInsert['Status'] = 'Live fees';
                    }

                    JsonInsert['Memo'] = feesExcel[j].Memo;
                    JsonInsert['Natural Account Code'] = feesExcel[j].Natural_Account_Code;
                    feesExcelDownload.push(JsonInsert);
               }  //endif

          } // end of For loop on formatting , get rid of Draft fee only extract approved fees


          const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
          const EXCEL_EXTENSION = '.xlsx';

          const worksheet = XLSX.utils.json_to_sheet(feesExcelDownload);
          const workbook = {
               Sheets: {
                    'data': worksheet
               },
               SheetNames: ['data']

          };

          const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          console.log(excelBuffer);
          saveAsExcel(excelBuffer, 'Fee');



          function saveAsExcel(buffer, filename) {

               var today = new Date();
              
               var date = ("0" + today.getDate()).slice(-2) + ("0" + (today.getMonth() + 1)).slice(-2) + ("0" + today.getYear()).slice(-2);
               var time = ("0" + today.getHours()).slice(-2) + ("0" + today.getMinutes()).slice(-2)  + ("0" + today.getSeconds()).slice(-2);        
               var dateTime = date+'_'+time;
               const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
               const EXCEL_EXTENSION = '.xlsx';
               const data = new Blob([buffer], { type: EXCEL_TYPE });
               saveAs(data, filename + '_Register_' + dateTime + EXCEL_EXTENSION);

          }


     });  //end of Ajax

}  //end of function



