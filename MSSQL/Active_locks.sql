USE SOURCE

Create Function Active_locks () returns table return
select Top 10000000 case dtl.request_session_id
when -2 then 'orphaned distributed transaction'
when -3 then 'deferred recovery transaction'
else dtl.request_session_id end as spid,
db_name(dtl.resource_database_id) as databasename,
so.name as lockedobjectname, dtl.resource_type as lockedresource,
dtl.request_mode as locktype, es.login_name as loginname, es.host_name as hostname,
case tst.is_user_transaction when 0 then 'system transaction'
when 1 then 'user transaction' end as user_or_system_transaction,
at.name as transactionname, dtl.request_status
from sys.dm_tran_locks dtl join sys.partitions sp on sp.hobt_id = dtl.resource_associated_entity_id
join sys.objects so on so.object_id = sp.object_id
join sys.dm_exec_sessions es on es.session_id = dtl.request_session_id
join sys.dm_tran_session_transactions tst on es.session_id = tst.session_id
join sys.dm_tran_active_transactions at on tst.transaction_id = at.transaction_id
join sys.dm_exec_connections ec on ec.session_id = es.session_id
cross apply sys.dm_exec_sql_text(ec.most_recent_sql_handle) as st
where resource_database_id = db_id() order by dtl.request_session_id


set transaction isolation level  read committed
Begin transaction
update Employee set employeeid=1 where employeeid =6

commit transaction

set transaction isolation level  read committed
Begin transaction
select * from Employee with (updlock) where employeeid = 1

select * from Active_locks()


