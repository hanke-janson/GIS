select * from dmpd_drone_fence;

  insert into dmpd_drone_fence (fence_name, fence_coordinate, fence_other, creator_id, fence_type,
                                      business_type)
        values ('天心阁服务站~高桥服务站', GEOC_WGS84TOGCJ02(ST_SetSRID(
            ST_MakeLine(
                ST_Point(112.9800000000000000,28.1800000000000000), 
                ST_Point(113.0200000000000000,28.1700000000000000)),
                4326)), null, 13, null,2) returning id
        