import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function QuickStartFrontend() {
    return (
        <div className="">
            <div className="row">
                <div className={clsx('col col--6 ')}>
                    <a className={styles.docA} onClick={()=>alert('正在积极完善中，请稍等几日')}>
                        <div className={styles.docCategory}>
                            <h5 className={styles.docTitle}>
                                📄️ Javascript Web APP
                            </h5>
                            <p className={styles.docDescription}>
                                使用Javascript SDK，快速体验在生产环境线上，发布与回滚一个Web APP的新功能特性
                            </p>
                        </div>
                    </a>
                </div>
                <div className={clsx('col col--6 ')}>
                    <a className={styles.docA} onClick={()=>alert('正在积极完善中，请稍等几日')}>
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
                    <a className={styles.docA} onClick={()=>alert('正在积极完善中，请稍等几日')}>
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
            </div>

        </div>
    );
}
