"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '@/components/Nav';
import Sidebar from '@/components/Sidebar';
import UnivInfo from '@/components/UnivInfo';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

const ClubsPage = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedClusters, setSelectedClusters] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    setOpen(false);
    fetchClubs();
    fetchDepartments();
    fetchClusters();
  }, []);

  const fetchClubs = async () => {
    try {
      const response = await axios.get('https://intracu-backend-mdl9.onrender.com/api/deptSocieties/departmental-societies');
      if (response.data.success) {
        setClubs(response.data.Entities);
      }
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('https://intracu-backend-mdl9.onrender.com/api/departmentroutes/departments');
      if (response.data.success) {
        setDepartments(response.data.departments);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchClusters = async () => {
    try {
      const response = await axios.get('https://intracu-backend-mdl9.onrender.com/api/cluster/clusters');
      if (response.data.success) {
        setClusters(response.data.clusters);
      }
    } catch (error) {
      console.error('Error fetching clusters:', error);
    }
  };

  const handleDepartmentSelect = (department) => {
    setSelectedDepartments(prev =>
      prev.includes(department)
        ? prev.filter(d => d !== department)
        : [...prev, department]
    );
  };

  const handleClusterSelect = (cluster) => {
    setSelectedClusters(prev =>
      prev.includes(cluster)
        ? prev.filter(c => c !== cluster)
        : [...prev, cluster]
    );
  };

  const columns = [
    { 
      name: "Name", 
      selector: (row) => row.ProposedEntityName, 
      sortable: true,
      cell: row => (
        <Link href={`https://cuintra-frontend-bj29.vercel.app/../${row.ProposedEntityName}/membershipForm`}>
          <span className="font-bold">{row.ProposedEntityName}</span>
        </Link>
      ),
    },
    { name: "Department", selector: (row) => row.EntityDepartment.name, sortable: true },
    { name: "Institute", selector: (row) => row.EntityInstitute.name, sortable: true },
    { name: "Cluster", selector: (row) => row.EntityCluster.name, sortable: true },
    {
      name: "Action",
      cell: row => (
        <Link href={`https://cuintra-frontend-bj29.vercel.app/../${row.ProposedEntityName}/membershipForm`}>
          <Button className="px-2 py-2 text-black border-2 border-blue-500 rounded-xl">
            Join now
          </Button>
        </Link>
      ),      
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const filteredClubs = clubs.filter(club =>
    (selectedDepartments.length === 0 || selectedDepartments.includes(club.EntityDepartment.name)) &&
    (selectedClusters.length === 0 || selectedClusters.includes(club.EntityCluster.name)) &&
    (club.ProposedEntityName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar open={open} setOpen={setOpen} className="z-20" />
      <div className="flex-1 overflow-auto">
        <div className={`transition-all duration-300 ${open ? "ml-64" : "ml-20"}`}>
          <Nav />
          <div className="p-4 md:p-6 lg:p-8">
            <UnivInfo />
            <div className="mt-6 space-y-6 lg:flex lg:space-y-0 lg:space-x-6">
              <div className="space-y-6 lg:w-1/6">
                <div className="p-4 text-white shadow-lg bg-gradient-to-r from-lightYellow to-darkYellow rounded-3xl">
                  <h2 className="mb-2 text-2xl font-bold md:text-3xl md:mb-4">Department Societies</h2>
                  <p className="hidden text-sm md:block">Discover a world of opportunities to explore your passions and make a lasting impact on campus.</p>
                </div>
                <div className="p-4 text-white shadow-lg bg-gradient-to-r from-lightYellow to-darkYellow rounded-3xl">
                  <h2 className="mb-2 text-2xl font-bold md:text-3xl md:mb-4">Physio Society</h2>
                  <p className="hidden text-sm md:block">Discover a world of opportunities to explore your passions and make a lasting impact on campus.</p>
                </div>
              </div>
              <div className="flex-1 p-4 border-2 shadow-lg rounded-3xl md:p-6">
                <div className="flex flex-col justify-between gap-4 mb-6 md:flex-row">
                  <input
                    placeholder="Search"
                    className="w-full p-2 border-2 rounded-full md:w-2/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className='flex flex-col gap-4 sm:flex-row'>
                    <Dropdown>
                      <DropdownTrigger className='w-full bg-white sm:w-auto'>
                        <Button className='w-full px-4 sm:w-auto' variant="bordered">
                          {selectedDepartments.length > 0 ? `${selectedDepartments.length} selected` : 'All Departments'}
                          <ChevronDown />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Department selection">
                        {departments.map((department) => (
                          <DropdownItem
                            key={department._id}
                            onClick={() => handleDepartmentSelect(department.name)}
                          >
                            {department.name}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                      <DropdownTrigger className='w-full bg-white sm:w-auto'>
                        <Button className='w-full px-4 sm:w-auto' variant="bordered">
                          {selectedClusters.length > 0 ? `${selectedClusters.length} selected` : 'All Clusters'}
                          <ChevronDown />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Cluster selection">
                        {clusters.map((cluster) => (
                          <DropdownItem
                            key={cluster._id}
                            onClick={() => handleClusterSelect(cluster.name)}
                          >
                            {cluster.name}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <DataTable
                    columns={columns}
                    data={filteredClubs}
                    fixedHeader
                    pagination
                    responsive
                    customStyles={{
                      headCells: {
                        style: {
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: 'white',
                          background: '#5375D5',
                        },
                      },
                      cells: {
                        style: {
                          fontSize: '14px',
                          color: '#4A4A4A',
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubsPage;