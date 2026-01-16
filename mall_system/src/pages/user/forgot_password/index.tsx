import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Helmet } from '@umijs/max';
import { Typography, Input, Button } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import { history } from '@umijs/max';

const { Title, Text } = Typography;

const useStyles = createStyles(({ token }) => {
    return {
        container: {
            display: 'flex',
            height: '100vh',
            overflow: 'hidden',
            position: 'relative',
        },
        backgroundImage: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.15, // 降低背景图片透明度，使其显示为淡色
            zIndex: 0,
        },
        backgroundOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.7)', // 添加白色半透明遮罩层，进一步淡化背景
            zIndex: 1,
        },
        content: {
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
        },
        formContainer: {
            textAlign: 'center',
            backgroundColor: '#fff',
            padding: '60px 80px',
            borderRadius: '8px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
            minWidth: '550px',
            maxWidth: '700px',
            width: '90%',
        },
        title: {
            marginBottom: '30px',
            color: token.colorTextHeading,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputContainer: {
            marginBottom: '30px',
        },
        input: {
            height: '48px',
            fontSize: '16px',
        },
        button: {
            height: '48px',
            fontSize: '16px',
            width: '100%',
            marginBottom: '20px',
        },
        passwordContainer: {
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
        },
        passwordText: {
            fontSize: '28px',
            fontWeight: 'bold',
            color: token.colorPrimary,
            fontFamily: 'monospace',
            marginTop: '10px',
        },
        usernameText: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: token.colorTextHeading,
            marginBottom: '10px',
        },
        backButton: {
            marginTop: '20px',
            cursor: 'pointer',
            color: token.colorPrimary,
            '&:hover': {
                textDecoration: 'underline',
            },
        },
    };
});

const ForgotPassword: React.FC = () => {
    const { styles } = useStyles();
    const [username, setUsername] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [userType, setUserType] = useState<'admin' | 'user' | null>(null);
    const [hasSearched, setHasSearched] = useState<boolean>(false);

    const handleSubmit = () => {
        if (!username.trim()) {
            return;
        }

        setHasSearched(true);

        // 根据用户名判断类型
        if (username === 'k99admin') {
            setUserType('admin');
            setShowPassword(true);
        } else if (username === 'k99user') {
            setUserType('user');
            setShowPassword(true);
        } else {
            setShowPassword(false);
            setUserType(null);
        }
    };

    const getPassword = () => {
        return 'k99comp';
    };

    const getDisplayUsername = () => {
        if (userType === 'admin') {
            return 'k99admin';
        } else if (userType === 'user') {
            return 'k99user';
        }
        return '';
    };

    const getAccessText = () => {
        if (userType === 'admin') {
            return '管理员';
        } else if (userType === 'user') {
            return '普通用户';
        }
        return '';
    };

    return (
        <div className={styles.container}>
            <Helmet>
                <title>忘记密码 - K99 MALL</title>
            </Helmet>
            <img
                src="/mall_logo.png"
                alt="K99 MALL Background"
                className={styles.backgroundImage}
            />
            <div className={styles.backgroundOverlay} />
            <div className={styles.content}>
                <div className={styles.formContainer}>
                    <Title level={2} className={styles.title}>
                        <LockOutlined style={{ marginRight: '8px', color: '#1890ff', fontSize: '32px' }} />
                        忘记密码
                    </Title>

                    {!showPassword ? (
                        <>
                            <div className={styles.inputContainer}>
                                <Text type="secondary" style={{ display: 'block', marginBottom: '12px', textAlign: 'left' }}>
                                    请输入您的用户名：
                                </Text>
                                <Input
                                    size="large"
                                    prefix={<UserOutlined />}
                                    placeholder="用户名: k99admin or k99user"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onPressEnter={handleSubmit}
                                    className={styles.input}
                                />
                            </div>
                            <Button
                                type="primary"
                                size="large"
                                onClick={handleSubmit}
                                className={styles.button}
                                disabled={!username.trim()}
                            >
                                查询密码
                            </Button>
                            {hasSearched && username && username !== 'k99admin' && username !== 'k99user' && (
                                <Text type="danger" style={{ display: 'block', marginTop: '10px' }}>
                                    用户名不存在，请输入 k99admin 或 k99user
                                </Text>
                            )}
                        </>
                    ) : (
                        <>
                            <Text type="secondary" style={{ display: 'block', marginBottom: '20px' }}>
                                您的账号信息：
                            </Text>
                            <div className={styles.passwordContainer}>
                                <Text type="secondary" style={{ display: 'block', marginBottom: '8px' }}>
                                    用户名：
                                </Text>
                                <div className={styles.usernameText}>
                                    {getDisplayUsername()}
                                </div>
                                <Text type="secondary" style={{ display: 'block', marginTop: '20px', marginBottom: '8px' }}>
                                    您的密码是：
                                </Text>
                                <div className={styles.passwordText}>
                                    {getPassword()}
                                </div>
                                <Text type="secondary" style={{ display: 'block', marginTop: '20px', fontSize: '14px' }}>
                                    权限: {getAccessText()}
                                </Text>
                            </div>
                            <Button
                                type="default"
                                size="large"
                                onClick={() => {
                                    setShowPassword(false);
                                    setUsername('');
                                    setUserType(null);
                                    setHasSearched(false);
                                }}
                                className={styles.button}
                                style={{ marginTop: '20px' }}
                            >
                                重新查询
                            </Button>
                        </>
                    )}

                    <div
                        className={styles.backButton}
                        onClick={() => history.push('/user/login')}
                    >
                        返回登录页面
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
