import { memo, Suspense } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import routes from "./router";
import { Loading } from 'react-vant';
import './App.less'

export default memo(() => (
    <Suspense fallback={
        <Loading style={{ display: 'inline-flex' }} size="24px" vertical>
            加载中...
        </Loading>

    }>
        <div className="App">
            <Router>
                <Routes>
                    {
                        routes.map((item: any) => (
                            <Route
                                key={item.path}
                                path={item.path}
                                element={<item.component />}
                            />
                        ))
                    }
                </Routes>
            </Router>
        </div>
    </Suspense>
))