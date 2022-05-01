import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function Documentation() {
    return (
        <div className="">
            <div className="row">
                <div className={clsx('col col--6 ')}>
                    <a className={styles.docA} href=''>
                        <div className={styles.docCategory}>
                            <h5 className={styles.docTitle}>
                                📄️ Java Spring Boot
                            </h5>
                            <p className={styles.docDescription}>
                                使用Java SDK Wrapper，快速体验在生产环境线上，发布与回滚一个的后端服务的新功能特性
                            </p>
                        </div>
                    </a>
                </div>
                <div className={clsx('col col--6 ')}>
                    <a className={styles.docA} href=''>
                        <div className={styles.docCategory}>
                            <h5 className={styles.docTitle}>
                                📄️ React Web APP
                            </h5>
                            <p className={styles.docDescription}>
                                使用React SDK，快速体验在生产环境线上，发布与回滚一个Web APP的新功能特性
                            </p>
                        </div>
                    </a>
                </div>
            </div>


            <div className="row">
                <div className={clsx('col col--6 ')}>
                    <a className={styles.docA} href=''>
                        <div className={styles.docCategory}>
                            <h5 className={styles.docTitle}>
                                📄️ 微信小程序
                            </h5>
                            <p className={styles.docDescription}>
                                使用微信小程序SDK，快速体验在生产环境线上，发布与回滚一个微信小程序的新功能特性
                            </p>
                        </div>
                    </a>
                </div>
                <div className={clsx('col col--6 ')}>
                    <a className={styles.docA} href=''>
                        <div className={styles.docCategory}>
                            <h5 className={styles.docTitle}>
                                📄️ Python
                            </h5>
                            <p className={styles.docDescription}>
                                使用Python SDK，在一个Python应用环境下，快速体验发布与回滚一个新功能特性
                            </p>
                        </div>
                    </a>
                </div>
            </div>

        </div>
    );
}
