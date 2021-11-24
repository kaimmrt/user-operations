import React from 'react'
import { Layout } from "antd";
import { useRouteMatch } from "react-router-dom";

import App from "../../routes/index";

const MainApp = () => {
    const match = useRouteMatch();
    const { Content, Footer } = Layout;

    return (
        <Layout >
            <Layout>
                <Content>
                    <App match={match} />
                    {/* <Footer>
                            <div className="gx-layout-footer-content">
                                {footerText}
                            </div>
                        </Footer> */}
                </Content>
            </Layout>
        </Layout>
    )
}

export default MainApp
