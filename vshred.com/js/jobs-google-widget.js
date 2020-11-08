
$(document).ready(function () {

  $.get('https://hire.withgoogle.com/v2/api/t/vshredcom/public/jobs', function(data) {
  })

  .done(function(results){

    var jobs = results;
    let departments = {};
    let deptNodes = []

    jobs.forEach(function(job) {
      if(!departments[job.hiringOrganization.department.name]) {
        departments[job.hiringOrganization.department.name] = [];
      }
        departments[job.hiringOrganization.department.name].push(job);

    });

    Object.keys(departments).forEach(function (item) {
      deptNodes.push(
        $(`
          <div id="dept-${item}">
          <h3>${item}</h3>
          </div>
          `)
      );

      deptNodes.forEach(function(node) {
        $('#hire-results').append(node);
      })

      departments[item].forEach(function(position) {
        var e = `<div class="job-item"><a href="${position.url}">${position.title}</a></h3><p>${position.jobLocation.address.addressLocality}</p></div>`
        var dept = `#dept-${position.hiringOrganization.department.name}`
        $(dept).append(e);
      })


    });
  })

  .fail(function(xhr) {
   console.log('Error, Will Robinson!', xhr);
  });

});
