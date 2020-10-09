export declare interface Interface {
    interfaceMethod(): void;
}

export declare class BaseClass {
    baseMethod(): void;
}

export declare class Foo extends BaseClass implements Interface {
    interfaceMethod(): void;
}


declare json = {
    id: 0,
    name: 'cortexjs.io',
    kind: 0,
    flags: {},
    originalName: '',
    children: [
        {
            id: 1,
            name: '"test.d"',
            kind: 1,
            kindString: 'Module',
            flags: { isExported: true },
            originalName: '/Users/arno/dev/cortexjs.io/test.d.ts',
            children: [
                {
                    id: 5,
                    name: 'BaseClass',
                    kind: 128,
                    kindString: 'Class',
                    flags: { isExported: true },
                    children: [
                        {
                            id: 6,
                            name: 'baseMethod',
                            kind: 2048,
                            kindString: 'Method',
                            flags: { isExported: true },
                            signatures: [
                                {
                                    id: 7,
                                    name: 'baseMethod',
                                    kind: 4096,
                                    kindString: 'Call signature',
                                    flags: { isExported: true },
                                    type: { type: 'intrinsic', name: 'void' },
                                },
                            ],
                            sources: [
                                {
                                    fileName: 'test.d.ts',
                                    line: 6,
                                    character: 14,
                                },
                            ],
                        },
                    ],
                    groups: [{ title: 'Methods', kind: 2048, children: [6] }],
                    sources: [
                        { fileName: 'test.d.ts', line: 5, character: 30 },
                    ],
                    extendedBy: [{ type: 'reference', id: 8, name: 'Foo' }],
                },
                {
                    id: 8,
                    name: 'Foo',
                    kind: 128,
                    kindString: 'Class',
                    flags: { isExported: true },
                    children: [
                        {
                            id: 11,
                            name: 'baseMethod',
                            kind: 2048,
                            kindString: 'Method',
                            flags: { isExported: true },
                            signatures: [
                                {
                                    id: 12,
                                    name: 'baseMethod',
                                    kind: 4096,
                                    kindString: 'Call signature',
                                    flags: { isExported: true },
                                    type: { type: 'intrinsic', name: 'void' },
                                    inheritedFrom: {
                                        type: 'reference',
                                        id: 6,
                                        name: 'BaseClass.baseMethod',
                                    },
                                },
                            ],
                            sources: [
                                {
                                    fileName: 'test.d.ts',
                                    line: 6,
                                    character: 14,
                                },
                            ],
                            inheritedFrom: {
                                type: 'reference',
                                id: 6,
                                name: 'BaseClass.baseMethod',
                            },
                        },
                        {
                            id: 9,
                            name: 'interfaceMethod',
                            kind: 2048,
                            kindString: 'Method',
                            flags: { isExported: true },
                            signatures: [
                                {
                                    id: 10,
                                    name: 'interfaceMethod',
                                    kind: 4096,
                                    kindString: 'Call signature',
                                    flags: { isExported: true },
                                    type: { type: 'intrinsic', name: 'void' },
                                    implementationOf: {
                                        type: 'reference',
                                        id: 4,
                                        name: 'Interface.interfaceMethod',
                                    },
                                },
                            ],
                            sources: [
                                {
                                    fileName: 'test.d.ts',
                                    line: 10,
                                    character: 19,
                                },
                            ],
                            implementationOf: {
                                type: 'reference',
                                id: 3,
                                name: 'Interface.interfaceMethod',
                            },
                        },
                    ],
                    groups: [
                        { title: 'Methods', kind: 2048, children: [11, 9] },
                    ],
                    sources: [
                        { fileName: 'test.d.ts', line: 9, character: 24 },
                    ],
                    extendedTypes: [
                        { type: 'reference', id: 5, name: 'BaseClass' },
                    ],
                    implementedTypes: [
                        { type: 'reference', id: 2, name: 'Interface' },
                    ],
                },
                {
                    id: 2,
                    name: 'Interface',
                    kind: 256,
                    kindString: 'Interface',
                    flags: { isExported: true },
                    children: [
                        {
                            id: 3,
                            name: 'interfaceMethod',
                            kind: 2048,
                            kindString: 'Method',
                            flags: { isExported: true },
                            signatures: [
                                {
                                    id: 4,
                                    name: 'interfaceMethod',
                                    kind: 4096,
                                    kindString: 'Call signature',
                                    flags: { isExported: true },
                                    type: { type: 'intrinsic', name: 'void' },
                                },
                            ],
                            sources: [
                                {
                                    fileName: 'test.d.ts',
                                    line: 2,
                                    character: 19,
                                },
                            ],
                        },
                    ],
                    groups: [{ title: 'Methods', kind: 2048, children: [3] }],
                    sources: [
                        { fileName: 'test.d.ts', line: 1, character: 34 },
                    ],
                    implementedBy: [{ type: 'reference', id: 8, name: 'Foo' }],
                },
            ],
            groups: [
                { title: 'Classes', kind: 128, children: [5, 8] },
                { title: 'Interfaces', kind: 256, children: [2] },
            ],
            sources: [{ fileName: 'test.d.ts', line: 1, character: 0 }],
        },
    ],
    groups: [{ title: 'Modules', kind: 1, children: [1] }],
};
