select * from dmpd_drone_fence;

  insert into dmpd_drone_fence (fence_name, fence_coordinate, fence_other, creator_id, fence_type,
                                      business_type)
        values ('天心阁服务站~高桥服务站', GEOC_WGS84TOGCJ02(ST_SetSRID(
            ST_MakeLine(
                ST_Point(112.9800000000000000,28.1800000000000000), 
                ST_Point(113.0200000000000000,28.1700000000000000)),
                4326)), null, 13, null,2) returning id

SELECT st_asgeojson((ST_Dump(st_geomFromGeojson('{ "type": "MultiPolygon", "coordinates": [ [ [ [ 110.317922986232816, 27.234130083826383 ], [ 110.603506868253533, 27.649178659029822 ], [ 111.709580216059408, 26.888119016044126 ], [ 111.423996334038691, 26.473070440840687 ], [ 110.317922986232816, 27.234130083826383 ] ] ] ] }'))).geom::geometry(Polygon,4326)) 

        