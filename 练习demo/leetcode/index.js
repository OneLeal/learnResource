/**
 * 比较版本大小：
 * 1.2.5 > 1.2.0
 * 1.2.5 > 1.2.5.Alpha = 1.2.5.Alpha1.0
 * 1.3.2.Alpha2.0 > 1.3.2.Alpha1.6 >  1.3.2.Beta1.6 >  1.3.2.Gama1.6
 */
var version1 = '1.3.2.Alpha1.6';
var version2 = '1.3.2.Beta5.6';

var versionGroup = ['Alpha', 'Beta', 'Gama'];
var versionMap = {
    Alpha: 3,
    Beta: 2,
    Gama: 1
};

var splitVersion = function (version) {
    if (typeof version !== 'string' || !version) return null;
    var prev, rear, mid, temp, index, count = 0;
    for (var i = 0; i < version.length; i++) {
        version[i] === '.' && count++;
        if (count === 3) {
            index = i + 1;
            break;
        }
    }

    prev = version.slice(0, index);
    rear = version.slice(index);
    versionGroup.forEach(item => {
        if (rear.indexOf(item) > -1) {
            temp = rear.split(item)[1];
            mid = rear.slice(0, rear.length - temp.length);
            rear = temp || '1.0';
        }
    });

    return [prev, mid, rear];
};

var compareVersion = function (version1, version2) {
    if (typeof version1 !== 'string' || typeof version2 !== 'string') return null;
    if (version1 && !version2) return version1;
    if (!version1 && version2) return version2;

    const arr1 = splitVersion(version1);
    const arr2 = splitVersion(version2);
    
    let v1 = +arr1[0].split('.').join('');
    let v2 = +arr2[0].split('.').join('');

    if (v1 !== v2) {
        return v1 > v2 ? version1 : version2;
    }

    v1 = arr1[1];
    v2 = arr2[1];

    if (!v1) return version1;
    if (!v2) return version2;
    if (v1 && v2) {
        v1 = versionMap[v1];
        v2 = versionMap[v2];
        if (v1 !== v2) {
            return v1 > v2 ? version1 : version2;
        }
    }

    v1 = +arr1[2].split('.').join('');
    v2 = +arr2[2].split('.').join('');
    return v1 >= v2 ? version1 : version2;
};
console.log('new version: ', compareVersion(version1, version2));