$(function() {
	$('#mbReleaseSearch').submit(function(e){
		e.preventDefault();
		//get json response for the query
		var queryUrl = 'http://musicbrainz.org/ws/2/release/';
		var queryString = $(this.query).val();
		$.getJSON(queryUrl,{
			fmt: 'json',
			query: queryString
		})
		.done(function(data){
			var table, copyRow;
			table = $('#resultTable');
			copyRow = table.find('tr.hidden');
			table.find('.inserted').remove();
			$('#numFound').html(data.count);
			$('#queryString').html(queryString);
			table = $('#resultTable');
			table.find('.inserted').remove();

			$.each(data.releases,function(k,v){
				var artist, title, tracks, newRow;
				artist = v['artist-credit'][0].artist.name;
				title = v.title;
				tracks = v['track-count'];
				newRow = copyRow.clone().removeClass('hidden').addClass('inserted');
				newRow.find('.title').html(title);
				newRow.find('.artist').html(artist);
				newRow.find('.tracks').html(tracks);
				table.append(newRow);
				});
			});

		});

});