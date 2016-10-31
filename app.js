var main = function() {
  var reports_url = 'http://localhost:8080/report';
  //applicationn data
  var ids = [];

  //functions
  var updateDisplay
  var getAllReports;
  var addSingleReport;
  var deleteSpecifiedReports;

  updateDisplay = function() {
    $('#display-panel').empty();
    getAllReports();
  };

/** Function definitions **************************************************************/

getAllReports = function() {
  //Write the headers
  var table_headers =
  '<table id="data_table" class="displayed_table">' +
      '<tr>' +
        '<th class="displayed_table_element">longitude</th>' +
        '<th class="displayed_table_element">latitude</th>' +
        '<th class="displayed_table_element" >timestamp</th>' +
        '<th class="displayed_table_element">altitude</th>' +
        '<th class="displayed_table_element">accuracy</th>' +
        '<th class="displayed_table_element">ID</th>' +
        '<th class="displayed_table_element">DELETE</th>' +
        '</tr>' +
      '</table>';
  $('#display-panel').append(table_headers);
  //Append the data from JSON
  $.getJSON(reports_url, function(json) {
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
      ids.push(json[i]._id);

      tr.append("<td class='displayed_table_element'><input type='checkbox' id='cb_" + json[i]._id + "'/></td>");
            tr.append("</tr>");
      $('#data_table').append(tr);
        }
    $('#data_table').append("<tr><td></td><td></td><td></td><td></td><td></td><td></td>" +
                "<td><input type='button' value='delete selected' id='delete_report_btn'/></td>");

  });
};

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

  updateDisplay();
};

  deleteSpecifiedReports = function() {
    console.log('delete event heard');
    deletion_url = reports_url + '/' + ids[0];
    $.delete(deletion_url);
  };

  //on main called populate display
  updateDisplay();

  //add lsiteners
  $('#add_report_btn').on('click', addSingleReport);
  $('#delete_report_btn').on('click', deleteSpecifiedReports);

  console.log(ids);


};

$(document).ready(main);
