import {MaterialSymbolsMenu} from "@/app/components/svgs";
import React, {ReactNode} from 'react'
import Link from "next/link";

type searchBarProps = {
    children: ReactNode,
    showFilterButton?: boolean
}

export default function SearchBar({children, showFilterButton = true}: searchBarProps) {


    return (
        <div className="bottom-0 flex flex-col items-center w-full fixed">
            {showFilterButton && (
                <Link href="/filter" className="bg-red-600 w-1/3 max-w-[200px] h-[37px] rounded-t-xl">
                    <div>
                        <MaterialSymbolsMenu className="w-full"/>
                    </div>
                </Link>
            )
            }
            <div className="w-full bg-[#072ac8] rounded-t-[16px] px-4 py-2">

                <div className="w-full bg-[#fdd85d] rounded-[1000px] flex justify-center p-4 mx-auto max-w-[400px]">
                    <div className=" w-full justify-center bg-white rounded-[1000px] p-4 text-center">
                        {children}

                    </div>
                </div>
            </div>
        </div>
    )
}
