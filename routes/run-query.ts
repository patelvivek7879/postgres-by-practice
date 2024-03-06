import express from 'express';
import { logger } from '../server';
import {client} from '../db-connection';

const router = express.Router();

router.post('/api/execute/query', express.text(), async (req, res) => {
    const query = req.body;

    try{
        const result = await client.query(query);

        console.log(result)

        //DROP, CREATE, UPDATE

        let operationFor = 'Table';

        if(query.toLowerCase().includes('database')){
            operationFor = 'Database';
        }

        switch(result.command){
            case 'DROP':
                res.status(200).json({
                    success: true,
                    message: `${operationFor} successfully dropped`,
                });
                break;
            case 'CREATE':
                res.status(200).json({
                    success: true,
                    message: `${operationFor} successfully created`,
                });
                break;
            case 'UPDATE':
                res.status(200).json({
                    success: true,
                    message: `${operationFor} successfully updated`,
                });
                break;
            default:
                '';
        }

        if(result && result.rows && result.rows.length > 0){
            res.status(200).json({
                success: true,
                message: 'Query executed successfully',
                data: result.rows,
            });
        }else{
            res.status(500).json({
                message: `Query execution failed, ${result.error}`,
                success: false,
                status: 500
             })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: `${err}`,
            success: false,
            status: 500,
        })
    }
})

export default router;

