import _ from 'lodash';

const descriptions = {
    53: 'DNS',
    80: 'HTTP',
    8080: 'HTTP (alternate)',
    443: 'HTTPS',
    8443: 'HTTPS (alternate)',
    143: 'IMAP',
    993: 'IMAPS',
    389: 'LDAP',
    1433: 'Microsoft SQL Server',
    3306: 'MySQL',
    42: 'nameserver',
    2049: 'NFS',
    1521: 'Oracle',
    110: 'POP3',
    995: 'POP3S',
    5432: 'PostgreSQL',
    3389: 'RDP',
    25: 'SMTP',
    465: 'SMTPS',
    22: 'SSH',
    23: 'telnet'
};

class Protocol {
    constructor(port) {
        const self = this;

        self.protocol = 'tcp';
        self.ipRange = '0.0.0.0/0';
        self.port = port;
        self.description = descriptions[port] || 'Custom';

        self.allProtocols = allProtocols;
        self.updatePort = updatePort;
        self.updateProtocol = updateProtocol;

        function allProtocols() {
            return _.uniq(Object.values(descriptions));
        }

        function updatePort() {
            self.port = getPortByProtocol(self.description);
        }

        function updateProtocol() {
            const description = descriptions[self.port];
            if (!description) descriptions[self.port] = 'Custom';
            self.description = descriptions[self.port];
        }

        function getPortByProtocol(protocol) {
            const port = Object.keys(descriptions).filter(key => descriptions[key] === protocol)[0];
            return Number.parseInt(port);
        }
    }
}

export default Protocol;