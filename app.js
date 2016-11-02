var main = function() {

  /*************************************************************************/
  /*  add custom made PUT and DELETE http verbs as shortcut methods
      from: http://stepansuvorov.com/blog/2014/04/jquery-put-and-delete/
  */
  jQuery.each( [ "put", "delete" ], function( i, method ) {
    jQuery[ method ] = function( url, data, callback, type ) {
      if ( jQuery.isFunction( data ) ) {
        type = type || callback;
        callback = data;
        data = undefined;
      }

      return jQuery.ajax({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      });
    };
  });

  /*********************************************************************/

  var reports_url = 'http://localhost:8080/report';

  //functions
  var updateDisplay
  var getAllReports;
  var addSingleReport;
  var deleteSpecifiedReports;

  updateDisplay = function() {
    //$('#display-panel td').empty();
    getAllReports();
  };

/** Function definitions ***************************************************/

  getAllReports = function() {
    //Write the headers
    // var table_headers =
    // '<table id="data_table" class="displayed_table" style="float: right">' +
    //     '<tr>' +
    //       '<th class="displayed_table_element">longitude</th>' +
    //       '<th class="displayed_table_element">latitude</th>' +
    //       '<th class="displayed_table_element" >timestamp</th>' +
    //       '<th class="displayed_table_element">altitude</th>' +
    //       '<th class="displayed_table_element">accuracy</th>' +
    //       '<th class="displayed_table_element">ID</th>' +
    //       '<th class="displayed_table_element">DELETE</th>' +
    //       '</tr>' +
    //     '</table>';
    // $('#display-panel').append(table_headers);
    // //Append the data from JSON
    $.getJSON(reports_url, function(json) {
      var tr;
          for (var i = 0; i < json.length; i++) {
              tr = $("<tr id='row" + i + "'>");
              tr.append("<td class='displayed_table_element'>" + json[i].longitude + "</td>");
              tr.append("<td class='displayed_table_element'>" + json[i].latitude + "</td>");
              tr.append("<td class='displayed_table_element'>" + json[i].timestamp + "</td>");

          if (json[i].altitude) {
            tr.append("<td class='displayed_table_element'>" + json[i].altitude + "</td>" );
          } else {
            tr.append("<td class='displayed_table_element'>-</td>" );
          };
          if (json[i].accuracy) {
            tr.append("<td class='displayed_table_element'>" + json[i].accuracy + "</td>" );
          } else {
            tr.append("<td class='displayed_table_element'>-</td>" );
          };
          tr.append("<td class='id-field'>" + json[i]._id + "</td>");
          tr.append("<td class='displayed_table_element'><input type='checkbox'" + "'/></td>");
          tr.append("</tr>");
        };
        $('#data_table tbody:last-child').append(tr);
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

    //Get the indexes of the checked checkboxes in the DELETE column
    var rowIndexesForDeletion = [];
    var checkboxes = $('#data_table tr td input');
    for(var i=0; i < checkboxes.length; i++) {
      if($(checkboxes[i]).is(':checked')){
          rowIndexesForDeletion.push(i);
      }
    }
    //Using these indexes get the relevent _id strings
    var idsForDeletion = []
    var ids = $(('.id-field')).slice();
    for (var i=0; i < rowIndexesForDeletion.length; i++) {
      idsForDeletion.push(ids[rowIndexesForDeletion[i]].innerHTML);
    }

    //TODO delete need some kind of security in header to be accepted
    // updateDisplay provided as callback on done, but needs a tweek
    for(var i=0; i<idsForDeletion.length; i++) {
      $.delete(reports_url + '/' + idsForDeletion[i], updateDisplay);
    }
  };

  //add lsiteners
  $('#add_report_btn').on('click', addSingleReport);
  $('#delete_report_btn').on('click', deleteSpecifiedReports);

  updateDisplay();
};

$(document).ready(main);
