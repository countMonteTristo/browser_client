var main = function() {

  var reports_url = 'http://localhost:8080/report';
  //applicationn data
  var ids = {};

  //functions
  var getAllReports;
  var addSingleReport;
  var deleteSpecifiedReports;

  $.getJSON(reports_url, function(json) {
      getAllReports(json);
  });

  /** Function definitions **************************************************************/

  getAllReports = function(json) {
    var tr;
        for (var i = 0; i < json.length; i++) {
            tr = $('<tr>');
            tr.append("<td class='displayed_table_element'>" + json[i].longitude + "</td>");
            tr.append("<td class='displayed_table_element'>" + json[i].latitude + "</td>");
            tr.append("<td class='displayed_table_element'>" + json[i].timestamp + "</td>");
      if (json[i].altitude) {
        tr.append("<td class='displayed_table_element'>" + json[i].altitude + "</td>" );
      } else {
        tr.append("<td class='displayed_table_element'>-</td>" );
      }
      if (json[i].accuracy) {
        tr.append("<td class='displayed_table_element'>" + json[i].accuracy + "</td>" );
      } else {
        tr.append("<td class='displayed_table_element'>-</td>" );
      }
      tr.append("<td class='displayed_table_element'>" + json[i]._id + "</td>");
      //add id to application state

      tr.append("<td class='displayed_table_element'><input type='checkbox' id='cb_" + json[i]._id + "'/></td>");
            tr.append("</tr>");
      $('#data_table').append(tr);
        }
    $('#data_table').append("<tr><td></td><td></td><td></td><td></td><td></td><td></td>" +
                "<td><input type='button' value='delete selected' onClick='deleteSpecifiedReports()'/></td>");

  }

addSingleReport = function() {
  console.log('addSingReport() invoked');
  var _longitude = $('#longitude_input').val();
  var _latitude = $('#latitude_input').val();
  var _timestamp = $('#timestamp_input').val();
  var _altitude = $('#altitude_input').val();
  var _accuracy = $('#accuracy_input').val();

  var data = {
    "longitude": _longitude,
    "latitude":	_latitude,
    "timestamp": _timestamp,
    "altitude":	_altitude,
    "accuracy":	_accuracy
  }
  console.log(data);
  $.post(reports_url, data, 'json');
};

  deleteSpecifiedReports = function() {
    var rowCount = $('#data_table tr').length - 1 //One row is for delete button itself
    console.log(document.getElementById(data_table).rows[0]);
    var toDelete = [];
    console.log(rowCount);
    for(var i=0; i<rowCount; i++) {

      //var extractedID = $('#)
      //if ()
    }
  };
};

$(document).ready(main);
