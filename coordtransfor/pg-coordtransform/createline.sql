select * from dmpd_drone_fence;

  -- 两点创建一条线
  insert into dmpd_drone_fence (fence_name, fence_coordinate, fence_other, creator_id, fence_type,
                                      business_type)
        values ('天心阁服务站~高桥服务站', GEOC_WGS84TOGCJ02(ST_SetSRID(
            ST_MakeLine(
                ST_Point(112.9800000000000000,28.1800000000000000), 
                ST_Point(113.0200000000000000,28.1700000000000000)),
                4326)), null, 13, null,2) returning id
  -- 多点创建一条线
  insert into dmpd_drone_fence (fence_name, fence_coordinate, fence_other, creator_id, fence_type,business_type)
    values ('湘阴县人民医院——鹤龙湖镇中心卫生院', 
            GEOC_WGS84TOGCJ02(
                ST_SetSRID(
                    ST_MakeLine(
                        ARRAY[
                            ST_Point(112.89141111111111,28.695202777777777), 
                            ST_Point(112.88286666666666,28.693333333333335),
                            ST_Point(112.86821111111111,28.686069444444446),
                            ST_Point(112.78009166666666,28.677761111111113)
                        ]
                    ),
                4326)
            ), 
            null, 
            13, 
            null,
            2
           ) returning id;
    
SELECT st_asgeojson((ST_Dump(st_geomFromGeojson('{ "type": "MultiPolygon", "coordinates": [ [ [ [ 110.317922986232816, 27.234130083826383 ], [ 110.603506868253533, 27.649178659029822 ], [ 111.709580216059408, 26.888119016044126 ], [ 111.423996334038691, 26.473070440840687 ], [ 110.317922986232816, 27.234130083826383 ] ] ] ] }'))).geom::geometry(Polygon,4326)) 

-- 解决序列问题 postgres 保存报错duplicate key value violates unique constraint 解决方案
select * from dmpd_drone_fence_id_seq;

select setval('dmpd_drone_fence_id_seq', (select max(id) from dmpd_drone_fence));
        


update
    dmpd_drone_fence_cgcs2000
set
    fence_coordinate = ST_SetSRID(
        ST_MakeLine(
            ARRAY [
ST_Point(112.89141111111111,28.695202777777777),
ST_Point(112.88286666666666,28.693333333333335),
ST_Point(112.86821111111111,28.686069444444446),
ST_Point(112.78009166666666,28.677761111111113)
                        ]
        ),
        4490
    )
where
    fence_name = '湘阴县人民医院——鹤龙湖镇中心卫生院';