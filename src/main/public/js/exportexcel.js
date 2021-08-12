

document.getElementById("mybutton").addEventListener("click", myFunction);

function myFunction() {
     document.getElementById('mybutton').querySelector('#submit').setAttribute('disabled', 'true');

     var feesReadable = $("#FeesReadable").val();

          var feesExcel = [];
          var totalFeeCount = 0;
          var currentDate = new Date();

          var downloadFees = JSON.parse(feesReadable);
          var monthNames = ["January", "February", "March", "April", "May", "June",
               "July", "August", "September", "October", "November", "December"
          ];
          var totalResults = Object.keys(downloadFees).length;


          for (var i = 0; i < totalResults; i++) {

               feeVersionTotalCount = Object.keys(downloadFees[i].fee_versions).length


               for (var feeVersionCount = 0; feeVersionCount < feeVersionTotalCount; feeVersionCount++) {

                    var jsonData = {};
                    jsonData['code'] = downloadFees[i].code;

                    jsonData['Description'] = downloadFees[i].fee_versions[feeVersionCount].description;

                    if (downloadFees[i].fee_versions[feeVersionCount].flat_amount !== undefined) {
                         let amount_ext = downloadFees[i].fee_versions[feeVersionCount].flat_amount.amount;
                         let amount_formatted = parseFloat(amount_ext).toFixed(2)
                         jsonData['Amount'] = amount_formatted.toString();
                    }
                    else if (downloadFees[i].fee_versions[feeVersionCount].volume_amount !== undefined) {
                         let amount_ext = downloadFees[i].fee_versions[feeVersionCount].volume_amount.amount;
                         let amount_formatted = parseFloat(amount_ext).toFixed(2)
                         jsonData['Amount'] = amount_formatted.toString();
                    }
                    else if (downloadFees[i].fee_versions[feeVersionCount].percentage_amount !== undefined) {
                         let amount_ext = downloadFees[i].fee_versions[feeVersionCount].percentage_amount.percentage;
                         let amount_formatted = parseFloat(amount_ext).toFixed(2)
                         jsonData['Amount'] =  '';
                         jsonData['percent'] =  amount_formatted.toString();

                    }
                    else {
                         jsonData['Amount'] = '';
                         jsonData['percent'] = '';
                    }

                    jsonData['Statutory_Instrument'] = downloadFees[i].fee_versions[feeVersionCount].statutory_instrument;
                    jsonData['SI_Ref_ID'] = downloadFees[i].fee_versions[feeVersionCount].si_ref_id;
                    jsonData['Last_Amending_Si'] = downloadFees[i].fee_versions[feeVersionCount].last_amending_si;
                    jsonData['Consolidated_Fee_Order_Name'] = downloadFees[i].fee_versions[feeVersionCount].consolidated_fee_order_name;
                    jsonData['Service'] = downloadFees[i].service_type.name;
                    jsonData['Jurisdiction1'] = downloadFees[i].jurisdiction1.name;
                    jsonData['Jurisdiction2'] = downloadFees[i].jurisdiction2.name;
                    jsonData['Event'] = downloadFees[i].event_type.name;
                    if (downloadFees[i].min_range !== undefined) {
                         jsonData['Range_from'] = parseFloat(downloadFees[i].min_range).toFixed(2);
                    }
                    else { jsonData['Range_from'] = ''; }
                    if (downloadFees[i].max_range !== undefined) {
                         jsonData['Range_to'] = parseFloat(downloadFees[i].max_range).toFixed(2);
                    }
                    else { jsonData['Range_to'] = ''; }
                    jsonData['Unit'] = downloadFees[i].range_unit;
                    jsonData['Fee_Type'] = downloadFees[i].fee_type;

                    if (downloadFees[i].fee_versions[feeVersionCount].flat_amount !== undefined) {
                         jsonData['Amount_type'] = 'Flat';
                    }
                    else if (downloadFees[i].fee_versions[feeVersionCount].volume_amount !== undefined) {
                         jsonData['Amount_type'] = 'Volume';
                    }
                    else {
                         jsonData['Amount_type'] = 'Percentage';
                    }

                    jsonData['Channel'] = downloadFees[i].channel_type.name;
                    jsonData['Keyword'] = downloadFees[i].keyword;
                    jsonData['Applicant_type'] = downloadFees[i].applicant_type.name;
                    jsonData['Version'] = downloadFees[i].fee_versions[feeVersionCount].version;
                    jsonData['Direction'] = downloadFees[i].fee_versions[feeVersionCount].direction;
                    if (downloadFees[i].fee_versions[feeVersionCount].valid_from !== undefined) {
                         var date_ext = downloadFees[i].fee_versions[feeVersionCount].valid_from;
                         var date_formatted = date_ext.substr(8, 2) + ' ' + monthNames[date_ext.substr(5, 2) - 1] + ' ' + date_ext.substr(0, 4);
                         jsonData['Valid_from'] = date_formatted
                    }
                    else { jsonData['Valid_from'] = ''; }
                    if (downloadFees[i].fee_versions[feeVersionCount].valid_to !== undefined) {
                         var date_ext = downloadFees[i].fee_versions[feeVersionCount].valid_to;
                         var date_formatted = date_ext.substr(8, 2) + ' ' + monthNames[date_ext.substr(5, 2) - 1] + ' ' + date_ext.substr(0, 4);
                         jsonData['Valid_to'] = date_formatted
                    }
                    else { jsonData['Valid_to'] = ''; }
                    jsonData['Status'] = downloadFees[i].fee_versions[feeVersionCount].status;
                    jsonData['Memo'] = downloadFees[i].fee_versions[feeVersionCount].memo_line;
                    jsonData['Natural_Account_Code'] = downloadFees[i].fee_versions[feeVersionCount].natural_account_code;


                    feesExcel.push(jsonData);
                    totalFeeCount = totalFeeCount + 1;
               }
          }



          var feesExcelDownload = [];
          for (var j = 0; j < totalFeeCount; j++) {


               var JsonInsert = {};
               if (feesExcel[j].Status === 'approved') {

                    JsonInsert['Code'] = feesExcel[j].code;
                    JsonInsert['Description'] = feesExcel[j].Description;
                    if (isNaN(feesExcel[j].Amount)) {
                         JsonInsert['Amount'] = ''; 
                    } else {
                    JsonInsert['Amount'] = '£' + feesExcel[j].Amount; }
                    JsonInsert['Statutory Instrument'] = feesExcel[j].Statutory_Instrument;
                    JsonInsert['Last Amending SI'] = feesExcel[j].Last_Amending_Si;
                    JsonInsert['SI Ref ID'] = feesExcel[j].SI_Ref_ID;
                    JsonInsert['Consolidated/Original Fee Order Name'] = feesExcel[j].Consolidated_Fee_Order_Name;
                    JsonInsert['Service'] = feesExcel[j].Service;
                    JsonInsert['Jurisdiction1'] = feesExcel[j].Jurisdiction1;
                    JsonInsert['Jurisdiction2'] = feesExcel[j].Jurisdiction2;
                    JsonInsert['Event'] = feesExcel[j].Event;
                    JsonInsert['Range from'] = feesExcel[j].Range_from;
                    JsonInsert['Range to'] = feesExcel[j].Range_to;
                    JsonInsert['Unit'] = feesExcel[j].Unit;
                    JsonInsert['Fee Type'] = feesExcel[j].Fee_Type;
                    JsonInsert['Amount type'] = feesExcel[j].Amount_type;
                    JsonInsert['%'] = feesExcel[j].percent;
                    JsonInsert['Channel'] = feesExcel[j].Channel;
                    JsonInsert['Keyword'] = feesExcel[j].Keyword;
                    JsonInsert['Applicant type'] = feesExcel[j].Applicant_type;
                    JsonInsert['Version'] = feesExcel[j].Version.toString();
                    JsonInsert['Direction'] = feesExcel[j].Direction;
                    JsonInsert['Valid from'] = feesExcel[j].Valid_from;
                    JsonInsert['Valid to'] = feesExcel[j].Valid_to;

                    if (feesExcel[j].Valid_to != '') {
                         var validToDate = new Date(feesExcel[j].Valid_to)
                    } else { var validToDate = '' }
                    if (feesExcel[j].Valid_from != '') {
                         var validFromDate = new Date(feesExcel[j].Valid_from)
                    } else { var validFromDate = '' }

                    JsonInsert['Status'] = feesExcel[j].Status;
                    JsonInsert['Memo'] = feesExcel[j].Memo;
                    JsonInsert['Natural Account Code'] = feesExcel[j].Natural_Account_Code;
                    if (validToDate != '' && validToDate < currentDate) {
                         JsonInsert['Page type'] = 'Discontinued fees';
                    }
                    else if (validFromDate != '' && validFromDate > currentDate) {
                         JsonInsert['Page type'] = 'Approved but not live fees';
                    }
                    else {
                         JsonInsert['Page type'] = 'Live fees';
                    }
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
               document.getElementById('mybutton').querySelector('#submit').removeAttribute('disabled');
          }


//     });  //end of Ajax

}  //end of function
