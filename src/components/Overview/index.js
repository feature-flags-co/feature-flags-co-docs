import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function Overview() {
    return (
        <div className="">
            <div className="row" >
                <div className={clsx('col col--12 ')}>
                    <div style={{ borderTop: "1px solid #f3f1f1", maxWidth:"600px", marginTop: "20px", marginBottom: "10px" }}></div>
                </div>
                <div className={clsx('col col--6 ')}>
                    <a className={styles.docA} href='/docs/快速入门'>
                        <div className={styles.docCategory}>
                            <h5 className={styles.docTitle}>
                                📄️ 快速入门
                            </h5>
                            <p className={styles.docDescription}>
                                选择熟悉的语言和框架，根据指示，4-5步完成快速完成一个Feature flags应用实现。
                            </p>
                        </div>
                    </a>
                </div>
                <div className={clsx('col col--6 ')}>
                    <a className={styles.docA} href=''>
                        <div className={styles.docCategory}>
                            <h5 className={styles.docTitle}>
                                📄️ 使用 feature flags
                            </h5>
                            <p className={styles.docDescription}>
                                通过一系列教程，学会使用敏捷开关赋予feature flags的丰富的功能与使用方法。
                            </p>
                        </div>
                    </a>
                </div>
            </div>


            <div className="row">
                <div className={clsx('col col--12 ')}>
                    <div style={{ borderTop: "1px solid #f3f1f1", maxWidth:"600px", marginTop: "10px", marginBottom: "10px" }}></div>
                </div>
                <div className={clsx('col col--12 ')} style={{ textAlign: "left", marginTop: "10px", marginBottom: "10px" }}>
                    <h3 className={styles.docDescription}>
                        学习使用更多的功能特性，发挥feature flags技术和feature管理平台更多的价值
                    </h3>
                </div>

                <div className={clsx('col col--4 ')}>
                    <a className={styles.docA} href='/docs/feature-flags/organize-feature-flags/flag-list'>
                        <div className={styles.docCategory}>
                            <h5 className={styles.docTitle} style={{ marginBottom: "0px" }}>
                                📄️ 管理 feature flags
                            </h5>
                        </div>
                    </a>
                </div>
                <div className={clsx('col col--4 ')}>
                    <a className={styles.docA} href='/docs/feature-flags/user-and-segment/user-list'>
                        <div className={styles.docCategory}>
                            <h5 className={styles.docTitle} style={{ marginBottom: "0px" }}>
                                📄️ 目标用户管理
                            </h5>
                        </div>
                    </a>
                </div>
                <div className={clsx('col col--4 ')}>
                    <a className={styles.docA} href='/docs/advanced-feature-flags/code-reference%20copy'>
                        <div className={styles.docCategory}>
                            <h5 className={styles.docTitle} style={{ marginBottom: "0px" }}>
                                📄️ Feature flags 高级功能
                            </h5>
                        </div>
                    </a>
                </div>
                
                <div className={clsx('col col--4 ')}>
                    <a className={styles.docA} href='/docs/feature-workflow/trigger'>
                        <div className={styles.docCategory}>
                            <h5 className={styles.docTitle} style={{ marginBottom: "0px" }}>
                                📄️ 团队协同工作流
                            </h5>
                        </div>
                    </a>
                </div>
                
                <div className={clsx('col col--4 ')}>
                    <a className={styles.docA} href='/docs/advanced-feature-flags/code-reference%20copy'>
                        <div className={styles.docCategory}>
                            <h5 className={styles.docTitle} style={{ marginBottom: "0px" }}>
                                📄️ IAM与团队管理
                            </h5>
                        </div>
                    </a>
                </div>
                
                <div className={clsx('col col--4 ')}>
                    <a className={styles.docA} href='/docs/advanced-feature-flags/code-reference%20copy'>
                        <div className={styles.docCategory}>
                            <h5 className={styles.docTitle} style={{ marginBottom: "0px" }}>
                                📄️ 对照实验
                            </h5>
                        </div>
                    </a>
                </div>
            </div>

            <div className="row">
                <div className={clsx('col col--12 ')}>
                    <div style={{ borderTop: "1px solid #f3f1f1", maxWidth:"600px", marginTop: "10px", marginBottom: "10px" }}></div>
                </div>
                {/* <div className={clsx('col col--12 ')} style={{ textAlign: "left", marginTop: "10px", marginBottom: "10px" }}>
                    <h3 className={styles.docDescription}>
                        学习使用更多的功能特性，发挥feature flags技术和feature管理平台更多的价值
                    </h3>
                </div> */}

                <div className={clsx('col col--6 ')}>
                    <a className={styles.docA} href='/docs/feature-flags/organize-feature-flags/flag-list'>
                        <div className={styles.docCategory}>
                            <h5 className={styles.docTitle}>
                                📄️ 开发集成
                            </h5>
                            <p className={styles.docDescription}>
                                我们为主流编程语言与框架提供原生的SDKs，APIs和轻量解决方案，降低上手难度，提高使用稳定性。
                            </p>
                        </div>
                    </a>
                </div>
                <div className={clsx('col col--6 ')}>
                    <a className={styles.docA} href='/docs/feature-flags/user-and-segment/user-list'>
                        <div className={styles.docCategory}>
                            <h5 className={styles.docTitle}>
                                📄️ 应用集成
                            </h5>
                            <p className={styles.docDescription}>
                                打通市场和企业内部的技术、管理和市场生态，如钉钉,飞书, Jira, ELK, 观测云, Terraform等。
                            </p>
                        </div>
                    </a>
                </div>

                
                <div className={clsx('col col--12 ')}>
                    <div style={{ borderTop: "1px solid white", marginTop: "10px", marginBottom: "20px" }}></div>
                </div>
            </div>
        </div>
    );
}
