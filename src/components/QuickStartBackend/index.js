import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function QuickStartBackend() {
    return (
        <div className="">
            <div className="row">
                <div className={clsx('col col--6 ')}>
                    <a className={styles.docA} href=''>
                        <div className={styles.docCategory}>
                            <h5 className={styles.docTitle}>
                                📄️ Java Console
                            </h5>
                            <p className={styles.docDescription}>
                                使用Java SDK，在一个Java Console的应用环境下，快速体验发布与回滚一个新功能特性
                            </p>
                        </div>
                    </a>
                </div>
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
            </div>


            <div className="row">
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
